class CreateReminderCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :reminder_categories do |t|
      t.string :category, null: false

      t.timestamps null: false
    end
  end
end
