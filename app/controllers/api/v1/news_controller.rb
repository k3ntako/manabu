class Api::V1::NewsController < ApplicationController
  before_action :authenticate_user!, only: [:index]

  def index
    response = NewsParser.new
    current_weather = response.get_news

    render json: current_weather
  end
end
