class UserReminder < ApplicationRecord
  validates :sequence, null: false, numericality: { only_integer: true }

  belongs_to :reminder_category
  belongs_to :user

  def self.user_reminder_next_sequence(user)
    user_rem = user.user_reminders
    if user_rem.length == 0
      return 1
    else
      last_seq = user_rem.order("sequence DESC").limit(1).first[:sequence]
      return last_seq + 1
    end
  end
end
