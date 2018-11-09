class Api::V1::UsersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!, only: [:destroy]

  def index
    is_signed_in?
  end

  # def destroy
  #   signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
  #   set_flash_message! :notice, :signed_out if signed_out
  #   yield if block_given?
  #   respond_to_on_destroy
  # end

  private

  def is_signed_in?
    if user_signed_in?
      render :json => {"signed_in" => true, "user" => current_user}
    else
      render :json => {"signed_in" => false}
    end
  end

  # def respond_to_on_destroy
  #   # We actually need to hardcode this as Rails default responder doesn't
  #   # support returning empty response on GET request
  #   respond_to do |format|
  #     format.all { head :no_content }
  #     format.any(*navigational_formats) { redirect_to after_sign_out_path_for(resource_name) }
  #   end
  # end
  #
  # def after_sign_out_path_for(resource_name)
  #   "/"
  # end
end
