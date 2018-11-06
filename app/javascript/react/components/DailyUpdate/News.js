import React, { Component } from 'react';

class News extends Component {
constructor(props) {
    super(props);
    this.state = {
      news: []
    };

    this.fetchNews = this.fetchNews.bind(this)
  }

  fetchNews() {
    let weatherURL = `/api/v1/news`;
    fetch(weatherURL)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        news: data.articles
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  componentDidMount(){
    this.fetchNews()
  }

  render(){
    let newsWithImage = []
    let newsWithoutImage = []

    this.state.news.forEach(news => {
      if(news.urlToImage){
        newsWithImage.push(news)
      }else{
        newsWithoutImage.push(news)
      }
    })


    let news = newsWithImage.map(news => {
      return(
        <div key={news.title} className="cell small-24 large-12 news-card ">
          <div className="news-image-container">
            <img className="news-image" src={news.urlToImage} />
          </div>
          <h3 className="news-title"><a href={news.url}>{news.title}</a></h3>
          <p className="news-description">{news.description}</p>
        </div>
      )
    })
    return(
      <div className="grid-x grid-margin-x grid-margin-y news">
        <h1 className="cell small-24 news-header">News</h1>
        {news}
      </div>
    )
  }
}

export default News
