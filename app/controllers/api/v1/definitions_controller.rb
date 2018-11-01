class Api::V1::DefinitionsController < ApplicationController
  def index
    render json: Definition.where(card_id: params[:card_id])
  end

  def create
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
        new_def = Definition.new(card: card, definition_title: dt)
        new_def.save
      end
    end

    render json: {
      definition_titles: existing_def_titles + new_def_titles,
      cards: ActiveModel::Serializer::ArraySerializer.new(deck.cards)
    }
  end

  private

  def definition_params
    params.permit(:deck_id, :definition_titles => [:title, :id])
  end
end


# {"deck_name"=>"Numbers", "term_title"=>"Number", "definition_titles"=>[{"id"=>2, "title"=>"English"}, {"id"=>3, "title"=>"French"}, {"id"=>22, "title"=>"Pokemon"}, {"id"=>"new0", "title"=>"Monster"}], "number_of_definitions"=>4, "controller"=>"api/v1/definitions", "action"=>"create", "deck_id"=>"1", "definition"=>{}} permitted: false>
