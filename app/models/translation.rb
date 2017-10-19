class Translation < ApplicationRecord
  belongs_to :user
  
  mount_uploader :audio_file, AudioFileUploader
end
