class Api::V1::TranslationsController < ApplicationController
  def create
    temp_audio_file_path = params["recording"].tempfile.path
    output = %x(python lib/python/speech_to_text_2.1/run.py "#{temp_audio_file_path}")
    transcripts = JSON.parse(output)
    original = transcripts["original"]
    simple = transcripts["simple"]

    if current_user
      new_translation = Translation.new
      new_translation.user = current_user
      new_translation.audio_file = params["recording"].tempfile
      new_translation.transcript = original
      new_translation.simplified = simple
      new_translation.save
    end

    render json: {
      original: render_transcript(original),
      simplified: render_transcript(simple)
    }, status: :created
  end

  private

  def render_transcript(transcript)
    ApplicationController.render(partial: 'translations/translation', locals: { translation: transcript })
  end
end
