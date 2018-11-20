class Api::V1::ReminderCategoriesController < ApplicationController
  def index
    categories = current_user.reminder_categories
    render json: categories
  end

  def show
    category = current_user.reminder_categories.find(category_params[:id])
    reminders = category.reminders
    render json: reminders
  end

  def create
    category = ReminderCategory.create(category: new_reminders_params[:category])

    seq = UserReminder.user_reminder_next_sequence(current_user)
    UserReminder.create(user: current_user, reminder_category: category, sequence: seq)

    render json: category
  end

  private

  def category_params
    params.permit(:id)

  end

  def new_reminders_params
    params.permit(:category)
  end
end
