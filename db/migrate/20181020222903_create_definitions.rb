class CreateDefinitions < ActiveRecord::Migration[5.2]
  def change
    create_table :definitions do |t|
      t.text :definition, null: false
      t.belongs_to :card, null: false

      t.timestamps null: false
    end
  end
end
