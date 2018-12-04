import React from "react";
import {keys} from "../env"

export default class NewsHeaderTile extends React.Component {

  state = {
    articles: []
  }

  componentDidMount() {
    this.getArticles()
  }


  getArticles = () => {
    debugger
    fetch(`https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${keys.NEWS_KEY}`)
      .then(res => res.json())
      .then(res => this.setState({
        articles: res.articles
      }))
  };


  render() {
    return <>
        <div className="tile is-ancestor">
          <div className="tile is-8 is-vertical is-parent">
            {this.state.articles && this.state.articles.map(article => (
                <div className="tile is-child box">
                  <article class="tile">
                    <p className="subtitle" src={article.url}>
                      {article.title}
                    </p>
                  </article>
                </div>
              ))}
          </div>
        </div>
      </>;
}
}