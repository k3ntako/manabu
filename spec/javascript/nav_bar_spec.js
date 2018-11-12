import NavBar from '../../app/javascript/react/components/NavBar'
import fetchMock from 'fetch-mock'

describe('Nav bar fetch user', () => {
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
      <NavBar location= {{pathname: "/"}}/>
    )
  })

  afterEach(fetchMock.restore)

  describe('NavBar', () => {
    it('renders a nav bar with a user logged in.', (done) => {
      setTimeout(() => {
        expect(wrapper.find('div.nav-dropdown-item').length).toEqual(0)
        expect(wrapper.find('a').at(0).text()).toEqual("Manabu")

        wrapper.find('.css-icon-menu').simulate('click')
        let dropdown = wrapper.find('div.nav-dropdown-item')
        expect(dropdown.length).toEqual(4)
        expect(dropdown.at(0).text()).toEqual("Flashcards")
        expect(dropdown.at(1).text()).toEqual("Notes")
        expect(dropdown.at(2).text()).toEqual("")
        expect(dropdown.at(3).text()).toEqual("Sign Out")
        done()
      })
    })
  })
})
