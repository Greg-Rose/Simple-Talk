class Translation < ApplicationRecord
  mount_uploader :audio_file, AudioFileUploader
end
