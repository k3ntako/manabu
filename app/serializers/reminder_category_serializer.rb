class ReminderCategorySerializer < ActiveModel::Serializer
  attributes :category, :id, :sequence

  def sequence
    object.user_reminders.where(user: current_user).first.sequence
  end
end
