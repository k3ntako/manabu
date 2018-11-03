import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute, Link, Redirect } from 'react-router';

import NavBar from './NavBar';
import Flashcard from './Flashcard/Flashcard';
import Study from './Flashcard/study/Study';
import Edit from './Flashcard/Edit/Edit';
import DailyUpdate from './DailyUpdate/DailyUpdate'
import Notes from './Notes/Notes'
import Note from './Notes/Note'


class App extends Component {
constructor(props) {
    super(props);
    this.state = {
      darkMode: '' //'' means off, 'darkMode' means on
    };
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
  }

  toggleDarkMode(){
    if(this.state.darkMode){
      this.setState({darkMode: 'darkMode'})
    }else{
      this.setState({darkMode: ''})
    }
  }

  render(){
    return(
      <Router history={browserHistory}>
        <Route path='/' component={NavBar} >
          <IndexRoute component={DailyUpdate} />
          <Route path='/flashcards'>
            <IndexRoute component={Flashcard} />
            <Route path="/flashcards/study/:id" component={Study}/>
            <Route path="/flashcards/edit/:id" component={Edit}/>
            <Redirect from='/flashcards/*' to="/flashcards" />
          </Route>
          <Route path='/notes'>
            <IndexRoute component={Notes} />
              <Route path="/notes/:id" component={Note}/>
          </Route>
          <Route path="daily_update" component={DailyUpdate} />
          <Route path="*" component={ErrorPage}/>
        </Route>
      </Router>
    )
  }
}

export default App;

const ErrorPage = props => {
  return(
    <div className="error-page">
      <h1>Error 404</h1>
      <h3 className="error-message">Page was not found. Go back to <Link to="/">K3ntako Flashcards</Link>.</h3>
    </div>
  )
}
