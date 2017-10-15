class Api::V1::TranslationsController < ApplicationController
  def create
    new_translation = Translation.new
    new_translation.audio_file = params["recording"].tempfile
    temp_audio_file_path = params["recording"].tempfile.path
    output = %x(python lib/python/speech_to_text_2.1/run.py "#{temp_audio_file_path}")

    transcripts = JSON.parse(output)
    new_translation.transcript = transcripts["original"]
    new_translation.simplified = transcripts["simple"]
    new_translation.save

    render json: {
      original: render_transcript(new_translation.transcript),
      simplified: render_transcript(new_translation.simplified)
    }, status: :created
  end

  private

  def render_transcript(transcript)
    ApplicationController.render(partial: 'translations/translation', locals: { translation: transcript })
  end
end
