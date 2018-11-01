class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.string :term, null: false
      t.integer :sequence, null: false
      t.belongs_to :deck, null: false

      t.timestamps null: false
    end
  end
end
