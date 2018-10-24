class Api::V1::DefinitionsController < ApplicationController
  def index
    render json: Definition.where(card_id: params[:card_id])
  end
end
