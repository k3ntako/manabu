import React from 'react';
import { Router, browserHistory, Route, IndexRoute, Link, Redirect } from 'react-router';

import NavBar from './NavBar';
import Flashcard from './Flashcard/Flashcard';
import Study from './Flashcard/study/Study';
import Edit from './Flashcard/Edit/Edit';
import NewDeck from './Flashcard/Edit/NewDeck';
import DailyUpdate from './DailyUpdate/DailyUpdate'
import Notes from './Notes/Notes'
import Note from './Notes/Note'
import RemindersIndex from './Reminders/RemindersIndex'

const App = () => {
  return(
    <Router history={browserHistory}>
      <Route path='/' component={NavBar} >
        <IndexRoute component={DailyUpdate} />
        <Route path='/flashcards'>
          <IndexRoute component={Flashcard} />
          <Route path="/flashcards/study/:id" component={Study}/>
          <Route path="/flashcards/edit/:id" component={Edit}/>
          <Route path="/flashcards/new" component={NewDeck}/>
          <Redirect from='/flashcards/*' to="/flashcards" />
        </Route>
        <Route path='/notes'>
          <IndexRoute component={Notes} />
            <Route path="/notes/:id" component={Note}/>
            <Route path="/notes/new" component={Note}/>
        </Route>
        <Route path='/reminders' component={RemindersIndex}/>
        <Route path="daily_update" component={DailyUpdate} />
        <Route path="/not-found" component={ErrorPage}/>
        <Redirect from='/*' to="/not-found" />
      </Route>
    </Router>
  )
}

export default App;

const ErrorPage = props => {
  return(
    <div className="error-page">
      <h1>Error 404</h1>
      <h3 className="error-message">Page was not found. Go back to <Link to="/">Manabu</Link>.</h3>
    </div>
  )
}
