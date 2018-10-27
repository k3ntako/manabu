class CreateMasteries < ActiveRecord::Migration[5.2]
  def change
    create_table :masteries do |t|
      t.string :mastery, null: false
      t.belongs_to :user, null: false
      t.belongs_to :card, null: false

      t.timestamps null: false
    end
  end
end
