class AddDefinitionTitlesToDecks < ActiveRecord::Migration[5.2]
  def change
    add_reference :decks, :definition_title, foreign_key: true
  end
end
