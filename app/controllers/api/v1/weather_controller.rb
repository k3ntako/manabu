class Api::V1::WeatherController < ApplicationController
  before_action :authenticate_user!, only: [:index]

  def index
    ip = request.remote_ip
    response = WeatherParser.new
    current_weather = response.current_conditions(weather_params, ip)

    render json: current_weather
  end

  private
  def weather_params
    params.permit(:latitude, :longitude, :units)
  end
end
