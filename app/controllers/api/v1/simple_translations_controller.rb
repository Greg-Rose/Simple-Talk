class Api::V1::SimpleTranslationsController < ApplicationController
  def show
    value = %x(python app/assets/python/speech_to_text_2.0/run.py)
    render json: { translation: render_simple_speak(value) }
  end

  private

  def render_simple_speak(translation)
    ApplicationController.render(partial: 'simple_speak_translations/translation', locals: { translation: translation })
  end
end
