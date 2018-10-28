class AddDefinitionTitlesToDefinitions < ActiveRecord::Migration[5.2]
  def change
    add_reference :definitions, :definition_title, foreign_key: true
  end
end
