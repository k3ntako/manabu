require 'factory_bot'

def_title = DefinitionTitle.create(title: "President Name")
deck = Deck.create(name: "President Name", definition_title: def_title)

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
    birthday { Date.new(1995,5,27) }
    first_name { 'Grace' }
    last_name { 'Hopper' }
  end

  factory :deck do
    name { 'US Presidents' }
    definition_title { def_title }
  end

  factory :definition_title do
    title { 'Hometown' }
  end

  factory :card do
    term { 'George Washington' }
    deck { deck }
    sequence(:sequence) {|n| n }
  end

  factory :note do
    name { 'Astrophysics' }
    note { 'Week 1: Astrophysics is the branch of astronomy that employs the principles of physics and chemistry "to ascertain the nature of the astronomical objects, rather than their positions or motions in space". - Wikipedia' }
  end
end
