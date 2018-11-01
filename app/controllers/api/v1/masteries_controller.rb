class Api::V1::MasteriesController < ApplicationController
  def create
    mastery = Mastery.where(user_id: 1, card_id: mastery_params[:card_id])[0]
    if mastery
      mastery.write_attribute(:mastery, mastery_params[:mastery])
    else
      mastery = Mastery.new(mastery_params)
      mastery.user_id = 1
    end

    if mastery.save
      render json: mastery
    else
      render json: {}
    end
  end

  private

  def mastery_params
    params.permit(:mastery, :card_id)
  end
end
