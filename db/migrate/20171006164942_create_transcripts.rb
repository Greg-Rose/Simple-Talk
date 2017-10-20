class CreateTranscripts < ActiveRecord::Migration[5.1]
  def change
    create_table :transcripts do |t|
      t.string :audio_file, null: false
      t.string :original
      t.string :simplified

      t.timestamps
    end
  end
end
