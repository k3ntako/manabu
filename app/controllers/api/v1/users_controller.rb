class Api::V1::UsersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!, only: [:update]

  def index
    is_signed_in?
  end

  def update
    user = current_user
    user.profile_photo = profile_image_params[:profile_image]
    if user.save!
      file_url = User.get_profile_photo(current_user.id, current_user.profile_photo)
      render json: {image_url: file_url, message: "Successfully updated your profile photo."}
    else
      render json: {message: "Error: Could not save profile photo."}
    end
  end

  private

  def is_signed_in?
    image_url = "https://s3.amazonaws.com/manabu-profile-photos/default/logo.png"
    if current_user.profile_photo.path
      image_url = User.get_profile_photo(current_user.id, current_user.profile_photo)
    end

    if user_signed_in?
      render :json => {"signed_in" => true, "user" => {current_user: current_user, profile_image_url: image_url}}
    else
      render :json => {"signed_in" => false}
    end
  end

  def profile_image_params
    params.permit(:profile_image)
  end
end
