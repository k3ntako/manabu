class Api::V1::RemindersController < ApplicationController


  def create
    category = current_user.reminder_categories.find_by(category: reminders_params[:category])
    seq = Reminder.reminder_next_sequence(category)

    reminder = Reminder.create(reminder: reminders_params[:reminder], sequence: seq, reminder_category: category)
    render json: reminder
  end

  private

  def reminders_params
    params.permit(:category, :reminder)
  end
end
