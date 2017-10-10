class Api::V1::TranslationsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    new_translation = Translation.new
    new_translation.audio_file = params["recording"].tempfile
    new_translation.save
    file_location = new_translation.audio_file.url
    output = %x(python lib/python/speech_to_text_2.1/run.py "#{file_location}")

    transcripts = JSON.parse(output)
    new_translation.update_attributes(transcript: transcripts["original"], simplified: transcripts["simple"])

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
