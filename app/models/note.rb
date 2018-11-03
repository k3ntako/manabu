class Note < ApplicationRecord
  validates :name, presence: true
  validates :note, presence: true

  has_many :user_notes
  has_many :users, through: :user_notes
end
