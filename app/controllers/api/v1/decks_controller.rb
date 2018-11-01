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

    def_titles_saved = true
    deck_params[:definition_titles].each do |dt|
      defTitle = DefinitionTitle.find(dt[:id])
      defTitle.attributes = {title: dt[:title]}
      if !defTitle.save
        binding.pry
        def_titles_saved = false
      end
    end

    if definition_title.save && deck.save && def_titles_saved
      def_titles = deck.definition_titles
      def_titles = def_titles.uniq { |dt| dt.id }
      render json: {
        deck: deck,
        term_title: definition_title[:title],
        definition_titles: ActiveModel::Serializer::ArraySerializer.new(def_titles)
      }
    else
      binding.pry
      render json: { :errors => definition_title.errors.full_messages }
    end
  end

  private

  def deck_params
    params.permit(:id, :deck_name, :term_title, :number_of_definitions, :definition_titles => [:title, :id])
  end
end
