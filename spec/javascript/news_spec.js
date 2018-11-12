import News from '../../app/javascript/react/components/DailyUpdate/News'
import fetchMock from 'fetch-mock'

describe('News fetch news', () => {
  let wrapper;
  let newsData;

  beforeEach(() => {
    newsData = {
      "status": "ok",
      "totalResults": 20,
      "articles": [
        {
            "source": {
                "id": null,
                "name": "Androidheadlines.com"
            },
            "author": null,
            "title": "Valve's Upcoming VR Headset Leaks In Full",
            "description": null,
            "url": "https://www.androidheadlines.com/2018/11/valve-upcoming-vr-headset-leak.html",
            "urlToImage": null,
            "publishedAt": "2018-11-12T16:51:05Z",
            "content": null
        },
        {
          "source": {
            "id": null,
            "name": "Appleinsider.com"
          },
          "author": "AppleInsider",
          "title": "iPhone XR sales estimates slashed by Ming-Chi Kuo, as trade war headwinds swirl",
          "description": "Ming-Chi Kuo has cut expectations for sales of the iPhone XR for the next year by 30 percent to 70 million, based on a possibility of a trade war with China, and other factors possibly weighing on sales, very similar to his erroneous predictions of iPhone X v…",
          "url": "https://appleinsider.com/articles/18/11/12/iphone-xr-sales-estimates-slashed-by-ming-chi-kuo-similar-to-his-iphone-x-prognostications",
          "urlToImage": "https://apple.insidercdn.com/gallery/28487-44424-28273-43866-iPhone-XR-Hero-l-xl.jpg",
          "publishedAt": "2018-11-12T16:14:01Z",
          "content": "Ming-Chi Kuo has cut expectations for sales of the iPhone XR for the next year by 30 percent to 70 million, based on a possibility of a trade war with China, and other factors possibly weighing on sales, very similar to his erroneous predictions of iPhone X v… [+2568 chars]"
        },
        {
          "source": {
            "id": "business-insider",
            "name": "Business Insider"
          },
          "author": "Steven John",
          "title": "The best smartphone chargers you can buy",
          "description": "There are lots of ways to charge your phone now, so we've rounded up the best phone chargers, including wireless, fast, car chargers, and more.",
          "url": "http://uk.businessinsider.com/best-phone-charger",
          "urlToImage": "https://amp.businessinsider.com/images/5be5eb4c38150718db7fce86-960-480.jpg",
          "publishedAt": "2018-11-12T15:23:00Z",
          "content": "Why you'll love it: The Aukey Dual Port USB-C and USB Wall Charger works with all three common charging cables — the Lightning Cable, the Micro USB, and the USB-C. Whether you need to power up an iPhone 8 Plus, a Microsoft Surface tablet, a 12-inch MacBook, o… [+1578 chars]"
        },
        {
          "source": {
            "id": null,
            "name": "Cnet.com"
          },
          "author": "Andrew Krok",
          "title": "Jaguar's one-off F-Type rally car is the gnarliest kind of homage",
          "description": "This new dirt-pounder pays respect to the XK 120, itself a rally champ.",
          "url": "https://www.cnet.com/roadshow/news/jaguar-f-type-convertible-rally-car/",
          "urlToImage": "https://cnet4.cbsistatic.com/img/ntGwUbgZurzemPwiRfsU190qH-I=/2018/11/12/f4310247-66ff-45b4-93e8-d6ad75b30b81/jaguar-f-type-rally-ogi.jpg",
          "publishedAt": "2018-11-12T15:07:48Z",
          "content": "The Jaguar F-Type exudes effortless cool, but you know what would make it even better? Jaguar knows the answer -- turning it into a rally car, of course. Jaguar on Monday unveiled the F-Type rally car. Now, these won't be going into service anywhere, as they'… [+1361 chars]"
        },
        {
          "source": {
            "id": null,
            "name": "Macworld.com"
          },
          "author": "",
          "title": "13-inch MacBook Pro SSD service program FAQ: Everything you need to know",
          "description": "Apple has launched an SSD repair program for the 13-inch non-Touch Bar MacBook Pro. Here's everything you need to know.",
          "url": "https://www.macworld.com/article/3320456/macs/13-inch-macbook-pro-ssd-service-program-faq.html",
          "urlToImage": "https://images.idgesg.net/images/article/2018/07/13in-macbook-pro-no-touchbar-2018-100765203-large.jpg",
          "publishedAt": "2018-11-12T15:07:22Z",
          "content": "Despite Apple’s push to turn all Mac professionals into Touch Bar devotees, the 13-inch MacBook Pro with a traditional row of function keys has remained quite popular. If you own one, you might be able to take advantage of a new SSD service program. Here’s ev… [+2698 chars]"
        },
      ]
    }

    fetchMock.get('/api/v1/news', {
      status: 200,
      body: newsData
    });
    wrapper = mount(
      <News />
    )
  })

  afterEach(fetchMock.restore)

  describe('News', () => {
    it('renders the news with images.', (done) => {
      setTimeout(() => {
        expect(wrapper.find('.news-card').length).toEqual(4);
        expect(wrapper.find('.news-image').length).toEqual(4);

        let images = wrapper.find('.news-image')
        expect(images.at(0).props().src).toEqual(newsData.articles[1].urlToImage)
        expect(images.at(1).props().src).toEqual(newsData.articles[2].urlToImage)
        expect(images.at(2).props().src).toEqual(newsData.articles[3].urlToImage)
        expect(images.at(3).props().src).toEqual(newsData.articles[4].urlToImage)

        let titles = wrapper.find('.news-title > a')
        console.log(titles.at(0).props().href);
        expect(titles.at(0).props().href).toEqual(newsData.articles[1].url)
        expect(titles.at(1).props().href).toEqual(newsData.articles[2].url)
        expect(titles.at(2).props().href).toEqual(newsData.articles[3].url)
        expect(titles.at(3).props().href).toEqual(newsData.articles[4].url)

        titles = wrapper.find('.news-title')
        expect(titles.at(0).text()).toEqual(newsData.articles[1].title)
        expect(titles.at(1).text()).toEqual(newsData.articles[2].title)
        expect(titles.at(2).text()).toEqual(newsData.articles[3].title)
        expect(titles.at(3).text()).toEqual(newsData.articles[4].title)

        let descriptions = wrapper.find('p.news-description')
        expect(descriptions.at(0).text()).toEqual(newsData.articles[1].description)
        expect(descriptions.at(1).text()).toEqual(newsData.articles[2].description)
        expect(descriptions.at(2).text()).toEqual(newsData.articles[3].description)
        expect(descriptions.at(3).text()).toEqual(newsData.articles[4].description)
        done()
      })
    })
  })
})
