class CreateDefinitionTitles < ActiveRecord::Migration[5.2]
  def change
    create_table :definition_titles do |t|
      t.string :title, null: false, unique: true

      t.timestamps null: false
    end
  end
end
