class Card < ApplicationRecord
  validates :term, presence: true
  validates :sequence, null: false, numericality: { only_integer: true }

  belongs_to :deck
  has_many :masteries
  has_many :users, through: :masteries
  has_many :definitions
end
