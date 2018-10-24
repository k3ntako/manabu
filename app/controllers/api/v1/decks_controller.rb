class Api::V1::DecksController < ApplicationController
  # serialization_scope :current_user

  def index
    render json: Deck.all

    # If we wanted to serve up multiple types of data, we could do the following, although it will detach it from our BookSerializer

    # render json: {
    #   books: Book.all,
    #   authors: Author.all
    # }
  end

  # def show
  #   render json: Book.find(params[:id]), serializer: BookShowSerializer
  # end
end
