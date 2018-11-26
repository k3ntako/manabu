class AddCompletedToReminders < ActiveRecord::Migration[5.2]
  def change
    add_column :reminders, :completed, :boolean, null: false, default: false
  end
end
