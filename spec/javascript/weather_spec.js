import Weather from '../../app/javascript/react/components/DailyUpdate/Weather'
import Skycons from '../../app/assets/javascripts/skycons'
import fetchMock from 'fetch-mock'

describe('Weather fetch current conditions', () => {
  let wrapper;
  let weatherData;

  beforeEach(() => {
    weatherData = {
      "summary": "Clear",
      "icon": "clear-day",
      "temperature": 44.95,
      "location": "Brookline, MA"
    }

    fetchMock.get('/api/v1/weather/?latitude=null&longitude=null&units=auto', {
      status: 200,
      body: weatherData
    });
    wrapper = mount(
      <Weather props={{darkMode: false}}/>
    )
  })

  afterEach(fetchMock.restore)

  describe('Weather', () => {
    it('renders an icon', (done) => {
      setTimeout(() => {
        expect(wrapper.find('#icon1').length).toEqual(1)
        expect(wrapper.find('#temp').text()).toEqual("Clear | 45˚F")
        expect(wrapper.find('#location').text()).toEqual("Brookline, MA")
        done()
      })
    })
  })
})
