class AddUserToTranscripts < ActiveRecord::Migration[5.1]
  def change
    add_reference :transcripts, :user, index: true
  end
end
