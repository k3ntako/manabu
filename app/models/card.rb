class Card < ApplicationRecord
  validates :term, presence: true

  belongs_to :deck
  has_many :masteries
  has_many :users, through: :masteries
  has_many :definitions
end
