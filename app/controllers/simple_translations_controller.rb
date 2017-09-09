class SimpleTranslationsController < ApplicationController
  def new
    render layout: false
  end

  def show
    # system("python app/assets/python/speech_to_text/run.py")
    # render stream: true
    value = %x(python app/assets/python/speech_to_text/run.py 2>&1)
    render html: value
  end
end
