require 'httparty'

class NewsParser
  def get_news
    response = HTTParty.get("https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=#{ENV["NEWS_API_KEY"]}")

    response
  end

  def get_address(latitude, longitude)
    response = HTTParty.get("http://dev.virtualearth.net/REST/v1/Locations/#{latitude},#{longitude}\?o\=json\&key\=#{ENV["BING_MAP_KEY"]}")

    response["resourceSets"][0]["resources"][0]["address"]["formattedAddress"]
  end
end
