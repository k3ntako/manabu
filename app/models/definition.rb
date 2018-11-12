class Definition < ApplicationRecord
  validates :definition, presence: true
  validates :sequence, null: false, numericality: { only_integer: true }

  belongs_to :card
  belongs_to :definition_title

  def self.def_next_sequence(card)
    last_seq = card.definitions.order("sequence DESC").limit(1).first[:sequence]
    last_seq + 1
  end
end
