class Reminder < ApplicationRecord
  validates :reminder, presence: true
  validates :sequence, null: false, numericality: { only_integer: true }

  belongs_to :reminder_category
  has_many :user_reminders, through: :reminder_category
  has_many :users, through: :user_reminders

  def self.reminder_next_sequence(category)
    user_cat = category.reminders
    if user_cat.length == 0
      return 1
    else
      last_seq = user_cat.order("sequence DESC").limit(1).first[:sequence]
      return last_seq + 1
    end
  end
end
