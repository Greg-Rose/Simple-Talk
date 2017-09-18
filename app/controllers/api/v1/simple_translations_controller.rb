class Api::V1::SimpleTranslationsController < ApplicationController
  def show
    original_output = %x(python app/assets/python/speech_to_text_2.1/run.py)
    simple_output = %x(python app/assets/python/speech_to_text_2.1/jargon_replace.py)
    # original = []
    # simple = []
    # sleep 5
    # File.readlines("app/assets/python/speech_to_text_2.1/original.txt").each do |line|
    #   original << line
    # end
    # File.readlines("app/assets/python/speech_to_text_2.1/simple.txt").each do |line|
    #   simple << line
    # end
    render json: { original: render_simple_speak(original_output), simple: render_simple_speak(simple_output) }
  end

  private

  def render_simple_speak(translation)
    ApplicationController.render(partial: 'simple_speak_translations/translation', locals: { translation: translation })
  end
end
