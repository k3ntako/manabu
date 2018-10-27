import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute, Link, Redirect } from 'react-router';

import Flashcard from './Flashcard/Flashcard';
import Study from './Flashcard/study/Study';
import DailyUpdate from './DailyUpdate/DailyUpdate'

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
        <Route path='/' component={DailyUpdate} />
        <Route path='/flashcard'>
          <IndexRoute component={Flashcard} />
          <Route path="/flashcard/study/:id" component={Study}/>
          <Route path="/flashcard/edit" component={Flashcard}/>
          <Redirect from='/flashcard/*' to="/flashcard" />
        </Route>
        <Route path="daily_update" component={DailyUpdate} />
        <Route path="*" component={ErrorPage}/>

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
