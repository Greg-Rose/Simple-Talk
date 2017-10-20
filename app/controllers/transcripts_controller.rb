class TranscriptsController < ApplicationController
  before_action :authenticate_user!, only: [:index]

  def index
    @transcripts = current_user.transcripts.order(created_at: :desc)
  end
end
