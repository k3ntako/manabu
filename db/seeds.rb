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
  {term: "1", deck_id: 1, sequence: 1},
  {term: "2", deck_id: 1, sequence: 2},
  {term: "3", deck_id: 1, sequence: 3},
  {term: "4", deck_id: 1, sequence: 4},
  {term: "5", deck_id: 1, sequence: 5},
  {term: "6", deck_id: 1, sequence: 6},
  {term: "7", deck_id: 1, sequence: 7},
  {term: "8", deck_id: 1, sequence: 8},
  {term: "9", deck_id: 1, sequence: 9},
  {term: "10", deck_id: 1, sequence: 10},
  {term: "Sunday", deck_id: 2, sequence: 1},
  {term: "Monday", deck_id: 2, sequence: 2},
  {term: "Tuesday", deck_id: 2, sequence: 3},
  {term: "Wednesday", deck_id: 2, sequence: 4},
  {term: "Thursday", deck_id: 2, sequence: 5},
  {term: "Friday", deck_id: 2, sequence: 6},
  {term: "Saturday", deck_id: 2, sequence: 7}
]

card_attributes.each do |attributes|
  Card.create(attributes)
end


definition_attributes = [
  {definition: "One", card_id: 1, definition_title_id: 2, sequence: 1},
  {definition: "Two", card_id: 2, definition_title_id: 2, sequence: 1},
  {definition: "Three", card_id: 3, definition_title_id: 2, sequence: 1},
  {definition: "Four", card_id: 4, definition_title_id: 2, sequence: 1},
  {definition: "Five", card_id: 5, definition_title_id: 2, sequence: 1},
  {definition: "Six", card_id: 6, definition_title_id: 2, sequence: 1},
  {definition: "Seven", card_id: 7, definition_title_id: 2, sequence: 1},
  {definition: "Eight", card_id: 8, definition_title_id: 2, sequence: 1},
  {definition: "Nine", card_id: 9, definition_title_id: 2, sequence: 1},
  {definition: "Ten", card_id: 10, definition_title_id: 2, sequence: 1},
  {definition: "Un", card_id: 1, definition_title_id: 3, sequence: 2},
  {definition: "Deux", card_id: 2, definition_title_id: 3, sequence: 2},
  {definition: "Trois", card_id: 3, definition_title_id: 3, sequence: 2},
  {definition: "Quatre", card_id: 4, definition_title_id: 3, sequence: 2},
  {definition: "Cinq", card_id: 5, definition_title_id: 3, sequence: 2},
  {definition: "Six", card_id: 6, definition_title_id: 3, sequence: 2},
  {definition: "Sept", card_id: 7, definition_title_id: 3, sequence: 2},
  {definition: "Huit", card_id: 8, definition_title_id: 3, sequence: 2},
  {definition: "Neuf", card_id: 9, definition_title_id: 3, sequence: 2},
  {definition: "Dix", card_id: 10, definition_title_id: 3, sequence: 2},
  {definition: "Dimanche", card_id: 11, definition_title_id: 3, sequence: 1},
  {definition: "Lundi", card_id: 12, definition_title_id: 3, sequence: 1},
  {definition: "Mardi", card_id: 13, definition_title_id: 3, sequence: 1},
  {definition: "Mercredi", card_id: 14, definition_title_id: 3, sequence: 1},
  {definition: "Jeudi", card_id: 15, definition_title_id: 3, sequence: 1},
  {definition: "Vendredi", card_id: 16, definition_title_id: 3, sequence: 1},
  {definition: "Samedi", card_id: 17, definition_title_id: 3, sequence: 1}
]

definition_attributes.each do |attributes|
  Definition.create(attributes)
end
