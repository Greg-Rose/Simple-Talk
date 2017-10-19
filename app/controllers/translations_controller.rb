class TranslationsController < ApplicationController
  before_action :authenticate_user!, only: [:index]

  def index
    translations = current_user.translations
  end
end
