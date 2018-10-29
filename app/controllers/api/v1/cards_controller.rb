class Api::V1::CardsController < ApplicationController
  def index
    cards = Card.where(deck_id: params[:deck_id])

    deck = Deck.find(params[:deck_id])
    deck_name = deck.name
    term_title = deck.definition_title.title
    duplicate_def_titles = deck.definition_titles
    definition_titles = duplicate_def_titles.uniq{|title| title.id}

    render json: {
      deck_name: deck_name,
      term_title: term_title,
      definition_titles: ActiveModel::Serializer::ArraySerializer.new(definition_titles),
      cards: ActiveModel::Serializer::ArraySerializer.new(cards)
    }
  end
end
