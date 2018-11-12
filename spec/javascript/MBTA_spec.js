import MBTA from '../../app/javascript/react/components/DailyUpdate/MBTA'
import fetchMock from 'fetch-mock'

describe('MBTA returns train times', () => {
  let wrapper;
  let routesData;
  let stopsData;
  let predictionsData;

  beforeEach(() => {
    routesData = [
      {
        "id": "Red",
        "name": "Red Line",
        "direction_names": ["Southbound","Northbound"]
      },
      {
        "id": "Mattapan",
        "name": "Mattapan Trolley",
        "direction_names": ["Outbound","Inbound"]
      },
      {
        "id": "Orange",
        "name": "Orange Line",
        "direction_names": ["Southbound","Northbound"]
      },
      {
        "id": "Green-B",
        "name": "Green Line B",
        "direction_names": ["Westbound","Eastbound"]
      },
      {
        "id": "Green-C",
        "name": "Green Line C",
        "direction_names": ["Westbound","Eastbound"]
      },
      {
        "id": "Green-D",
        "name": "Green Line D",
        "direction_names": ["Westbound","Eastbound"]
      },
      {
        "id": "Green-E",
        "name": "Green Line E",
        "direction_names": ["Westbound","Eastbound"]
      },
      {
        "id": "Blue",
        "name": "Blue Line",
        "direction_names": ["Westbound","Eastbound"]
      }
    ]

    stopsData = [
      {
        "id": "place-clmnl",
        "name": "Cleveland Circle"
      },
      {
        "id": "place-engav",
        "name": "Englewood Avenue"
      },
      {
        "id": "place-denrd",
        "name": "Dean Road"
      },
      {
        "id": "place-tapst",
        "name": "Tappan Street"
      },
      {
        "id": "place-bcnwa",
        "name": "Washington Square"
      },
      {
        "id": "place-fbkst",
        "name": "Fairbanks Street"
      },
      {
        "id": "place-bndhl",
        "name": "Brandon Hall"
      },
      {
        "id": "place-sumav",
        "name": "Summit Avenue"
      },
      {
        "id": "place-cool",
        "name": "Coolidge Corner"
      },
      {
        "id": "place-stpul",
        "name": "Saint Paul Street"
      },
      {
        "id": "place-kntst",
        "name": "Kent Street"
      },
      {
        "id": "place-hwsst",
        "name": "Hawes Street"
      },
      {
        "id": "place-smary",
        "name": "Saint Marys Street"
      },
      {
        "id": "place-kencl",
        "name": "Kenmore"
      },
      {
        "id": "place-hymnl",
        "name": "Hynes Convention Center"
      },
      {
        "id": "place-coecl",
        "name": "Copley"
      },
      {
        "id": "place-armnl",
        "name": "Arlington"
      },
      {
        "id": "place-boyls",
        "name": "Boylston"
      },
      {
        "id": "place-pktrm",
        "name": "Park Street"
      },
      {
        "id": "place-gover",
        "name": "Government Center"
      },
      {
        "id": "place-haecl",
        "name": "Haymarket"
      }
    ]

    predictionsData = {
      "data": [
        {
          "attributes": {
            "arrival_time": "2018-11-12T12:20:42-05:00",
            "departure_time": "2018-11-12T12:20:42-05:00",
            "direction_id": 0,
            "schedule_relationship": "ADDED",
            "status": null,
            "stop_sequence": 350
          },
          "id": "prediction-ADDED-1541328122-70217-350",
          "relationships": {
            "route":{"data": {"id": "Green-C","type": "route"}},
            "stop": {"data": {"id": "70217","type": "stop"}},
            "trip": {"data": {"id": "ADDED-1541328122","type": "trip"}}
          },
          "type": "prediction"
        },
        {
          "attributes": {
            "arrival_time": "2018-11-12T12:23:01-05:00",
            "departure_time": "2018-11-12T12:23:01-05:00",
            "direction_id": 0,
            "schedule_relationship": "ADDED",
            "status": null,
            "stop_sequence": 350
          },
          "id": "prediction-ADDED-1541328134-70217-350",
          "relationships": {
            "route": {"data": {"id": "Green-C","type": "route"}},
            "stop": {"data": {"id": "70217","type": "stop"}},
            "trip": {"data": {"id": "ADDED-1541328134","type": "trip"}}
          },
          "type": "prediction"
        },
        {
          "attributes": {
            "arrival_time": "2018-11-12T12:35:53-05:00",
            "departure_time": "2018-11-12T12:35:53-05:00",
            "direction_id": 0,
            "schedule_relationship": null,
            "status": null,
            "stop_sequence": 350
          },
          "id": "prediction-38092080-F-70217-350",
          "relationships": {
            "route": {"data": {"id": "Green-C","type": "route"}},
            "stop": {"data": {"id": "70217","type": "stop"}},
            "trip": {"data": {"id": "38092080-F","type": "trip"}}
          },
          "type": "prediction"
        },
        {
          "attributes": {
            "arrival_time": "2018-11-12T12:42:40-05:00",
            "departure_time": "2018-11-12T12:42:40-05:00",
            "direction_id": 0,
            "schedule_relationship": null,
            "status": null,
            "stop_sequence": 350
          },
          "id": "prediction-38092098-F-70217-350",
          "relationships": {
            "route": {"data": {"id": "Green-C","type": "route"}},
            "stop": {"data": {"id": "70217","type": "stop"}},
            "trip": {"data": {"id": "38092098-F","type": "trip"}}
          },
          "type": "prediction"
        },
        {
          "attributes": {
            "arrival_time": "2018-11-12T12:55:30-05:00",
            "departure_time": "2018-11-12T12:55:30-05:00",
            "direction_id": 0,
            "schedule_relationship": null,
            "status": null,
            "stop_sequence": 350
          },
          "id": "prediction-38092099-F-70217-350",
          "relationships": {
            "route": {"data": {"id": "Green-C","type": "route"}},
            "stop": {"data": {"id": "70217","type": "stop"}},
            "trip": {"data": {"id": "38092099-F","type": "trip"}}
          },
          "type": "prediction"
        },
        {
          "attributes": {
            "arrival_time": "2018-11-12T12:57:09-05:00",
            "departure_time": "2018-11-12T12:57:09-05:00",
            "direction_id": 0,
            "schedule_relationship": "ADDED",
            "status": null,
            "stop_sequence": 350
          },
          "id": "prediction-ADDED-1541328149-70217-350",
          "relationships": {
            "route": {"data": {"id": "Green-C","type": "route"}},
            "stop": {"data": {"id": "70217","type": "stop"}
            },
            "trip": {"data": {"id": "ADDED-1541328149","type": "trip"}}
          },
          "type": "prediction"
        },
        {
          "attributes": {
            "arrival_time": "2018-11-12T13:06:25-05:00",
            "departure_time": "2018-11-12T13:06:25-05:00",
            "direction_id": 0,
            "schedule_relationship": null,
            "status": "Stopped 24 stops away",
            "stop_sequence": 350
          },
          "id": "prediction-38092101-F-70217-350",
          "relationships": {
            "route": {"data": {"id": "Green-C","type": "route"}},
            "stop": {"data": {"id": "70217","type": "stop"}},
            "trip": {"data": {"id": "38092101-F","type": "trip"}}
          },
          "type": "prediction"
        }
      ]
    }

    fetchMock.get('/api/v1/mbta/routes', {
      status: 200,
      body: routesData
    });
    fetchMock.get('/api/v1/mbta/stops/?route=Green-C&direction=Eastbound', {
      status: 200,
      body: stopsData
    });
    fetchMock.get('/api/v1/mbta/predictions/?stop=place-stpul&direction=Eastbound&route=Green-C', {
      status: 200,
      body: predictionsData
    });
    wrapper = mount(
      <MBTA />
    )
  })

  afterEach(fetchMock.restore)

  describe('MBTA', () => {
    it('renders train times', (done) => {
      setTimeout(() => {
        let routeSelector = wrapper.find('select').at(0).text()
        expect(routeSelector.includes("Red Line")).toEqual(true)
        expect(routeSelector.includes("Mattapan Trolley")).toEqual(true)
        expect(routeSelector.includes("Orange Line")).toEqual(true)
        expect(routeSelector.includes("Green Line B")).toEqual(true)
        expect(routeSelector.includes("Green Line C")).toEqual(true)
        expect(routeSelector.includes("Green Line D")).toEqual(true)
        expect(routeSelector.includes("Green Line E")).toEqual(true)
        expect(routeSelector.includes("Blue Line")).toEqual(true)

        let directionSelector = wrapper.find('select').at(1).text()
        expect(directionSelector.includes("Eastbound")).toEqual(true)
        expect(directionSelector.includes("Westbound")).toEqual(true)

        let stopSelector = wrapper.find('select').at(2).text()
        expect(stopSelector.includes("Cleveland Circle")).toEqual(true)
        expect(stopSelector.includes("Coolidge Corner")).toEqual(true)
        expect(stopSelector.includes("Haymarket")).toEqual(true)
        expect(stopSelector.includes("North Station")).toEqual(false)
        done()
      })
    })
  })
})
