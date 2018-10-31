class Api::V1::DecksController < ApplicationController
  # serialization_scope :current_user
  def index
    render json: Deck.all
  end

  def update
    deck = Deck.find(params[:id])
    deck.attributes = {name: deck_params[:deck_name]}
    definition_title = deck.definition_title
    definition_title.attributes = {title: deck_params[:term_title]}

    deck_params[:definition_titles].each do |dt|
      defTitle = DefinitionTitle.find(dt[:id])
      defTitle.attributes = {title: dt[:title]}
      if !defTitle.save
        binding.pry
        render json: { :errors => defTitle.errors.full_messages }
      end
    end

    if definition_title.save && deck.save
      render json: deck_params
    else
      render json: { :errors => definition_title.errors.full_messages }
    end
  end

  private

  def deck_params
    params.permit(:id, :deck_name, :term_title, :number_of_definitions, :definition_titles => [:title, :id])
  end
end
