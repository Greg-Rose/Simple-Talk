class CreateTranslations < ActiveRecord::Migration[5.1]
  def change
    create_table :translations do |t|
      t.string :audio_file, null: false
      t.string :transcript
      t.string :simplified
    end
  end
end
