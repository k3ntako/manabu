class Api::V1::MbtaController < ApplicationController
  before_action :authenticate_user!, only: [:index]

  def routes
    response = MbtaParser.new
    routes = response.get_routes()
    render json: routes
  end

  def stops
    response = MbtaParser.new
    stops = response.get_stops(mbta_stops_params)
    render json: stops
  end

  def predictions
    response = MbtaParser.new
    predictions = response.get_predictions(mbta_prediction_params)
    render json: predictions
  end

  private
  def mbta_stops_params
    params.permit(:route, :direction)
  end

  def mbta_prediction_params
    params.permit(:route, :stop, :direction)
  end
end
