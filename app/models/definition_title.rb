class DefinitionTitle < ApplicationRecord
  validates :title, presence: true

  has_many :definitions
  has_many :cards
end
