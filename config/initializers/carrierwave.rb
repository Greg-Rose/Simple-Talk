CarrierWave.configure do |config|
  if Rails.env.production?
    config.fog_provider = 'fog/aws'
    config.fog_credentials = {
      provider: "AWS",
      aws_access_key_id: ENV["AWS_ACCESS_KEY_ID"],
      aws_secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"],
      region: 'us-east-1'
    }
    config.storage = :fog
    config.fog_directory  = ENV["S3_PRODUCTION_BUCKET"]
  end

  if Rails.env.development?
    config.fog_provider = 'fog/aws'
    config.fog_credentials = {
      provider: "AWS",
      aws_access_key_id: ENV["AWS_ACCESS_KEY_ID"],
      aws_secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"],
      region: 'us-east-1'
    }
    config.storage = :fog
    config.fog_directory  = ENV["S3_DEV_BUCKET"]
  end

  if Rails.env.test? || Rails.env.cucumber?
    config.storage = :file
    config.enable_processing = false
    config.root = "#{Rails.root}/tmp"
  end
end
