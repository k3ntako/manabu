class ReminderCategory < ApplicationRecord
  validates :category, null: false

  has_many :reminders
  has_many :user_reminders
  has_many :users, through: :user_reminders
end
