# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

definition_titles = ["Number", "English", "French", "JavaScript"]

definition_titles.each do |def_t|
  DefinitionTitle.create(title: def_t)
end

deck_attributes = [
  {name: "Numbers", definition_title_id: 1},
  {name: "Days of the Week", definition_title_id: 1},
  {name: "JavaScript", definition_title_id: 4}
]

deck_attributes.each do |attributes|
  Deck.create(attributes)
end

card_attributes = [
  {term: "1", deck_id: 1},
  {term: "2", deck_id: 1},
  {term: "3", deck_id: 1},
  {term: "4", deck_id: 1},
  {term: "5", deck_id: 1},
  {term: "6", deck_id: 1},
  {term: "7", deck_id: 1},
  {term: "8", deck_id: 1},
  {term: "9", deck_id: 1},
  {term: "10", deck_id: 1},
  {term: "Sunday", deck_id: 2},
  {term: "Monday", deck_id: 2},
  {term: "Tuesday", deck_id: 2},
  {term: "Wednesday", deck_id: 2},
  {term: "Thursday", deck_id: 2},
  {term: "Friday", deck_id: 2},
  {term: "Saturday", deck_id: 2}
]

card_attributes.each do |attributes|
  Card.create(attributes)
end


definition_attributes = [
  {definition: "One", card_id: 1, definition_title_id: 2},
  {definition: "Two", card_id: 2, definition_title_id: 2},
  {definition: "Three", card_id: 3, definition_title_id: 2},
  {definition: "Four", card_id: 4, definition_title_id: 2},
  {definition: "Five", card_id: 5, definition_title_id: 2},
  {definition: "Six", card_id: 6, definition_title_id: 2},
  {definition: "Seven", card_id: 7, definition_title_id: 2},
  {definition: "Eight", card_id: 8, definition_title_id: 2},
  {definition: "Nine", card_id: 9, definition_title_id: 2},
  {definition: "Ten", card_id: 10, definition_title_id: 2},
  {definition: "Un", card_id: 1, definition_title_id: 3},
  {definition: "Deux", card_id: 2, definition_title_id: 3},
  {definition: "Trois", card_id: 3, definition_title_id: 3},
  {definition: "Quatre", card_id: 4, definition_title_id: 3},
  {definition: "Cinq", card_id: 5, definition_title_id: 3},
  {definition: "Six", card_id: 6, definition_title_id: 3},
  {definition: "Sept", card_id: 7, definition_title_id: 3},
  {definition: "Huit", card_id: 8, definition_title_id: 3},
  {definition: "Neuf", card_id: 9, definition_title_id: 3},
  {definition: "Dix", card_id: 10, definition_title_id: 3},
  {definition: "Dimanche", card_id: 11, definition_title_id: 3},
  {definition: "Lundi", card_id: 12, definition_title_id: 3},
  {definition: "Mardi", card_id: 13, definition_title_id: 3},
  {definition: "Mercredi", card_id: 14, definition_title_id: 3},
  {definition: "Jeudi", card_id: 15, definition_title_id: 3},
  {definition: "Vendredi", card_id: 16, definition_title_id: 3},
  {definition: "Samedi", card_id: 17, definition_title_id: 3}
]

definition_attributes.each do |attributes|
  Definition.create(attributes)
end
