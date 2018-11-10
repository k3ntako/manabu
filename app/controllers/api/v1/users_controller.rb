class Api::V1::UsersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!, only: [:destroy]

  def index
    is_signed_in?
  end

  private

  def is_signed_in?
    if user_signed_in?
      render :json => {"signed_in" => true, "user" => current_user}
    else
      render :json => {"signed_in" => false}
    end
  end
end
