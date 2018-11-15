class Card < ApplicationRecord
  validates :term, presence: true
  validates :sequence, null: false, numericality: { only_integer: true }

  belongs_to :deck
  has_many :masteries
  has_many :users, through: :masteries
  has_many :definitions

  def self.filterByMastery(masteries, cards)
    filteredCards = []
    cards.each do |card|
      if card.masteries.length == 1 && masteries.include?(card.masteries.first["mastery"])
        filteredCards << card
      elsif card.masteries.length == 0 && masteries.include?("noMastery")
        filteredCards << card
      end
    end
    filteredCards
  end
end
