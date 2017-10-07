class TranslationsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    new_translation = Translation.new
    new_translation.audio_file = params["recording"].tempfile
    new_translation.save
    file_location = new_translation.audio_file.file.file.split("/Users/Greg/Coding-Projects/SimplifyDoc/")[1]
    original_output = %x(python app/assets/python/speech_to_text_2.1/run.py "#{file_location}")
    simple_output = %x(python app/assets/python/speech_to_text_2.1/jargon_replace.py)
    new_translation.update_attributes(transcript: original_output, simplified: simple_output)

    render json: {
      original: render_transcript(new_translation.transcript),
      simplified: render_transcript(new_translation.simplified)
    }
  end

  private

  def render_transcript(transcript)
    ApplicationController.render(partial: 'translations/translation', locals: { translation: transcript })
  end
end
