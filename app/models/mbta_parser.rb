require 'httparty'

TERMINAL_STOPS = {
  "Blue": {
    "Westbound": ["place-bomnl"],
    "Eastbound": ["place-wondl"]
  },
  "Red": {
    "Southbound": ["place-asmnl", "place-brntn"],
    "Northbound": ["place-alfcl"]
  },
  "Mattapan": {
    "Outbound": ["place-matt"],
    "Inbound": ["place-asmnl"]
  },
  "Orange": {
    "Southbound": ["place-forhl"],
    "Northbound": ["place-ogmnl"]
  },
  "Green-B": {
    "Westbound": ["place-lake"],
    "Eastbound": ["place-pktrm"]
  },
  "Green-C": {
    "Westbound": ["place-clmnl"],
    "Eastbound": ["place-north"]
  },
  "Green-D": {
    "Westbound": ["place-river"],
    "Eastbound": ["place-gover"]
  },
  "Green-E": {
    "Westbound": ["place-hsmnl"],
    "Eastbound": ["place-lech"]
  }
}

class MbtaParser
  def get_routes
    response = HTTParty.get("https://api-v3.mbta.com/routes?filter[type]=0,1&api_key=#{ENV["MBTA_KEY"]}")

    routes_info = []
    response["data"].each do |route|
      route_info = {
        id: route["id"],
        name: route["attributes"]["long_name"],
        direction_names: route["attributes"]["direction_names"]
      }
      routes_info << route_info
    end
    routes_info
  end

  def get_stops(query)
    response = HTTParty.get("https://api-v3.mbta.com/stops?filter[route]=#{query["route"]}&api_key=#{ENV["MBTA_KEY"]}")

    stops_info = []
    response["data"].each do |route|
      if TERMINAL_STOPS[query[:route].to_sym][query["direction"].to_sym].include?(route["id"])
        next
      end

      stop_info = {
        id: route["id"],
        name: route["attributes"]["name"]
      }
      
      stops_info << stop_info
    end
    stops_info
  end

  def get_predictions(query)
    arr = ["route", "stop", "direction"]
    route, stop_name, direction = query.values_at(*arr).compact

    response = HTTParty.get("https://api-v3.mbta.com/predictions?filter[stop]=#{stop_name}&[direction_id]=#{direction}&[route]=#{route}&sort=departure_time&page[limit]=90&api_key=64a5296bc7e84128b2605d9d355a1d94")

    response
  end
end
