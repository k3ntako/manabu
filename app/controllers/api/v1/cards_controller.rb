class Api::V1::CardsController < ApplicationController
  def index
    cards = Card.where(deck_id: params[:deck_id])
    deck = Deck.find(params[:deck_id])
    deck_name = deck.name
    render json: {deck_name: deck_name, cards: ActiveModel::Serializer::ArraySerializer.new(cards)}
  end
end
