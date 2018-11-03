class Api::V1::DefinitionTitlesController < ApplicationController
  # serialization_scope :current_user
  def destroy
    deck = Deck.find(df_params[:deck_id])
    binding.pry
    df_params[:deleted_definition_titles].each do |df|
      definitions = Definition.where(definition_title_id: df[:id])
      definitions.delete_all

      def_title = DefinitionTitle.find(df[:id])
      def_title.destroy
    end

    duplicate_def_titles = deck.definition_titles
    definition_titles = duplicate_def_titles.uniq{|title| title.id}

    render json: {cards: deck.cards, definition_titles: definition_titles}
  end

  private
  
  def df_params
    params.permit(:deck_id, :deleted_definition_titles => [:title, :id])
  end
end
