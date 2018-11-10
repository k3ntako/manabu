class User < ApplicationRecord
  validates :email, presence: true
  validates :encrypted_password, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :birthday, presence: true
  validates :sign_in_count, presence: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :masteries
  has_many :user_decks
  has_many :decks, through: :user_decks
  has_many :user_notes
  has_many :notes, through: :user_notes
end
