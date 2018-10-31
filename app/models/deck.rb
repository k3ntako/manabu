class Deck < ApplicationRecord
  validates :name, presence: true, length: {minimum: 3}

  has_many :cards
  has_many :user_decks
  has_many :users, through: :user_decks
  has_many :definitions, through: :cards
  has_many :definition_titles, through: :definitions
  belongs_to :definition_title
end
