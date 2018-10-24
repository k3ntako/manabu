class Api::V1::CardsController < ApplicationController
  def index
    render json: Card.where(deck_id: params[:deck_id])
  end
end
