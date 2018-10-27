class Mastery < ApplicationRecord
  validates :mastery, presence: true

  belongs_to :user
  belongs_to :card
end
