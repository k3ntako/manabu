import NavBar from '../../app/javascript/react/components/NavBar'
import fetchMock from 'fetch-mock'

describe('Game Index Page', () => {
  let wrapper;
  let currentUser;

  beforeEach(() => {
    currentUser = {
    "signed_in": true,
    "user": {
        "id": 1,
        "email": "kentarokaneki@gmail.com",
        "first_name": "Kentaro",
        "middle_name": null,
        "last_name": "Kaneki",
        "birthday": "1995-05-27",
        "created_at": "2018-11-02T19:19:18.757Z",
        "updated_at": "2018-11-03T14:29:33.482Z"
      }
    }

    fetchMock.get('/api/v1/users', {
      status: 200,
      body: currentUser
    });
    wrapper = mount(
      <NavBar />
    )
  })

  afterEach(fetchMock.restore)

  describe('NavBar', () => {
    it('renders a nav bar with a user logged in.', (done) => {
      setTimeout(() => {
        expect(wrapper.find('li').at(0).text()).toEqual("Manabu")
        expect(wrapper.find('li').at(1).text()).toEqual("Flashcards")
        expect(wrapper.find('li').at(2).text()).toEqual("Notes")

        expect(wrapper.find('li').length).toEqual(4)
        expect(wrapper.find('li').at(3).text()).toEqual("Sign Out")
        done()
      })
    })
  })
})
