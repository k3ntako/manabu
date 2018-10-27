class Api::V1::CardsController < ApplicationController
  def index
    cards = Card.where(deck_id: params[:deck_id])
    render json: cards
  end
end
