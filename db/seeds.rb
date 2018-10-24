# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

deck_names = ["Numbers","Days of the Week", "JavaScript"]

deck_names.each do |name|
  Deck.create(name: name)
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
  {definition: "One", card_id: 1},
  {definition: "Two", card_id: 2},
  {definition: "Three", card_id: 3},
  {definition: "Four", card_id: 4},
  {definition: "Five", card_id: 5},
  {definition: "Six", card_id: 6},
  {definition: "Seven", card_id: 7},
  {definition: "Eight", card_id: 8},
  {definition: "Nine", card_id: 9},
  {definition: "Ten", card_id: 10},
  {definition: "Un", card_id: 1},
  {definition: "Deux", card_id: 2},
  {definition: "Trois", card_id: 3},
  {definition: "Quatre", card_id: 4},
  {definition: "Cinq", card_id: 5},
  {definition: "Six", card_id: 6},
  {definition: "Sept", card_id: 7},
  {definition: "Huit", card_id: 8},
  {definition: "Neuf", card_id: 9},
  {definition: "Dix", card_id: 10},
  {definition: "Dimanche", card_id: 11},
  {definition: "Lundi", card_id: 12},
  {definition: "Mardi", card_id: 13},
  {definition: "Mercredi", card_id: 14},
  {definition: "Jeudi", card_id: 15},
  {definition: "Vendredi", card_id: 16},
  {definition: "Samedi", card_id: 17}
]

definition_attributes.each do |attributes|
  Definition.create(attributes)
end
