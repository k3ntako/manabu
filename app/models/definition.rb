class Definition < ApplicationRecord
  validates :definition, presence: true

  belongs_to :card
  belongs_to :definition_title
end
