class CreateUserDecks < ActiveRecord::Migration[5.2]
  def change
    create_table :user_decks do |t|
      t.belongs_to :deck, null: false
      t.belongs_to :user, null: false
      
      t.timestamps null: false
    end
  end
end
