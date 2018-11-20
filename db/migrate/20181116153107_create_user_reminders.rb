class CreateUserReminders < ActiveRecord::Migration[5.2]
  def change
    create_table :user_reminders do |t|
      t.integer :sequence, null: false
      t.belongs_to :reminder_category, null: false
      t.belongs_to :user, null: false

      t.timestamps null: false
    end
  end
end
