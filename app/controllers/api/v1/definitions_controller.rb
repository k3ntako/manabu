class Api::V1::DefinitionsController < ApplicationController
  def index
    render json: Definition.where(card_id: params[:card_id])
  end

  def create
    if !example_user?(current_user)
      deck = Deck.find(definition_params[:deck_id])
      existing_def_titles = []
      new_def_titles = []
      definition_params[:definition_titles].each do |defi|
        if(DefinitionTitle.exists?(defi[:id]))
          existing_def_titles << defi
        else
          new_dt = DefinitionTitle.create(title: defi[:title])
          new_def_titles << new_dt
        end
      end

      deck.cards.each do |card|
        new_def_titles.each do |dt|
          new_def = Definition.new(card: card, definition_title: dt, sequence: Definition.def_next_sequence(card))
          new_def.save
        end
      end

      render json: {
        definition_titles: existing_def_titles + new_def_titles,
        cards: ActiveModel::Serializer::ArraySerializer.new(deck.cards)
      }
    end
    render json: {error: "Example user cannot create a definition."}
  end

  private

  def definition_params
    params.permit(:deck_id, :definition_titles => [:title, :id])
  end
end
