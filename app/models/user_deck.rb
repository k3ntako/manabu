class User_Deck < ApplicationRecord
  validates :name, presence: true

  belongs_to :deck
  belongs_to :user
end
