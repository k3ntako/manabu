class Api::V1::UsersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!, only: [:destroy]

  def index
    is_signed_in?
  end

  def destroy
    binding.pry
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))

    yield if block_given?
    respond_to_on_destroy
  end


  def is_signed_in?
    if user_signed_in?
      render :json => {"signed_in" => true, "user" => current_user}
    else
      render :json => {"signed_in" => false}
    end
  end
end
