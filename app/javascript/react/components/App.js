import React, { Component } from 'react';
import { Router, browserHistory, Route, IndexRoute, Link, Redirect } from 'react-router';

import Flashcard from './Flashcard/Flashcard';
import FlashcardApp from './Flashcard/study/FlashcardApp';

// import FlashcardApp from './cards/FlashcardApp';
// import Edit from './edit/edit';
// import NavBar from './NavBar';
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
          <Route path="/flashcard/study/:id" component={FlashcardApp}/>
          <Route path="/flashcard/edit" component={Flashcard}/>
          <Redirect from='/flashcard/*' to="/flashcard" />
        </Route>
        <Route path="daily_update" component={DailyUpdate} />
        <Route path="*" component={ErrorPage}/>

      </Router>
    )
  }
}

//Seems like there is a better way to pass props in React-Router v4
//https://tylermcginnis.com/react-router-pass-props-to-components
//https://flaviocopes.com/react-pass-props-router/

export default App;

const ErrorPage = props => {
  return(
    <div className="error-page">
      <h1>Error 404</h1>
      <h3 className="error-message">Page was not found. Go back to <Link to="/">K3ntako Flashcards</Link>.</h3>
    </div>
  )
}
