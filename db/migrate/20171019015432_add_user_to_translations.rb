class AddUserToTranslations < ActiveRecord::Migration[5.1]
  def change
    add_reference :translations, :user, index: true
  end
end
