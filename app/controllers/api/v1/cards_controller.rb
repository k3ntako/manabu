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
      cards: ActiveModel::Serializer::CollectionSerializer.new(cards, each_serializer: CardSerializer)
    }
  end

  def create
    if !example_user?(current_user)
      deck = Deck.find(new_card_params[:deck_id])
      definition_titles = deck.definition_titles
      def_titles = definition_titles.uniq { |dt| dt.id }

      new_sequence = deck.cards.order("sequence DESC").limit(1)[0][:sequence] + 1
      new_card = Card.new(term: new_card_params[:new_term], sequence: new_sequence, deck: deck)

      if new_card.save
        def_titles.length.times do |i|
          Definition.create(sequence: i + 1, card_id: new_card[:id], definition_title: def_titles[i])
        end

        render json: new_card
      else
        render json: {error: "Could not save new card to database."}
      end
    end
    render json: {error: "Example user cannot create a new card."}
  end

  def update
    if !example_user?(current_user)
      card = Card.find(card_params[:card][:id])
      card.update(term: card_params[:card][:term])

      card_params[:definitions].each do |defi|
        definition = Definition.find(defi[:id])
        definition.update(definition: defi[:definition])
      end

      render json: {
        id: card_params[:card][:id],
        term: card_params[:card][:term],
        definitions: card_params[:definitions],
        masteries: card_params[:masteries]
      }
    else
      render json: {error: "Example user cannot update a card."}
    end
  end

  private

  def card_params
    params.permit(:id, :term, :deck_id, :definitions => [:id, :definition, :definition_title], :masteries => [], :card => [:id, :term])
  end

  def new_card_params
    params.permit(:new_term, :deck_id)
  end
end
