class Api::V1::DecksController < ApplicationController
  # serialization_scope :current_user
  def index
    render json: Deck.all
  end
end
