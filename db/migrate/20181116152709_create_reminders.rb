class CreateReminders < ActiveRecord::Migration[5.2]
  def change
    create_table :reminders do |t|
      t.string :reminder, null: false
      t.datetime :time_due
      t.integer :sequence, null: false
      t.belongs_to :reminder_category, null: false

      t.timestamps null: false
    end
  end
end
