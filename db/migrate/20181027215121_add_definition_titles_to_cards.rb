class AddDefinitionTitlesToCards < ActiveRecord::Migration[5.2]
  def change
    add_reference :cards, :definition_title, foreign_key: true
  end
end
