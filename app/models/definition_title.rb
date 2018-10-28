class DefinitionTitle < ApplicationRecord
  validates :title, presence: true, uniqueness: true

  has_many :definitions
  has_many :cards
end
