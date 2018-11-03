class CreateUserNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :user_notes do |t|
      t.boolean :owner, null: false, default: false
      t.belongs_to :user, null: false
      t.belongs_to :note, null: false

      t.timestamps null: false
    end
  end
end
