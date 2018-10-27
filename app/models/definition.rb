class Definition < ApplicationRecord
  validates :definition, presence: true

  belongs_to :card
end
