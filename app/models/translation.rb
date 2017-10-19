class Translation < ApplicationRecord
  belongs_to :user, optional: true

  mount_uploader :audio_file, AudioFileUploader
end
