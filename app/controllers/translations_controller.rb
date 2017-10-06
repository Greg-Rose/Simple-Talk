class TranslationsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    new_translation = Translation.new
    new_translation.audio_file = params["recording"].tempfile
    new_translation.save
    
    render json: {
      translation_id: new_translation.id
    }
  end
end
