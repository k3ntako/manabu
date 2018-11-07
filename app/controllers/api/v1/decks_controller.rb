class Api::V1::DecksController < ApplicationController
  # serialization_scope :current_user
  def index
    render json: Deck.all
  end

  def create
    term_title = DefinitionTitle.create(title: new_deck_params[:term_title])
    deck = Deck.new(name: new_deck_params[:deck_name], definition_title: term_title)

    UserDeck.create(deck: deck, user: current_user)

    all_new_def_titles = []
    new_deck_params[:definition_titles].each do |def_title|
      new_def_title = DefinitionTitle.create(title: def_title)
      all_new_def_titles << new_def_title
    end

    card = Card.create(sequence: 1, deck: deck, term: "First Term")

    all_new_def_titles.each_with_index do |def_title, idx|
      new_def = Definition.create(sequence: idx + 1, card: card, definition_title: def_title)
    end

    render json: {"message": "success", deck: deck}
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
      render json: { :errors => definition_title.errors.full_messages }
    end
  end

  private

  def deck_params
    params.permit(:id, :deck_name, :term_title, :number_of_definitions, :definition_titles => [:title, :id])
  end

  def new_deck_params
    params.permit(:deck_name, :term_title, :definition_titles => [])
  end
end
