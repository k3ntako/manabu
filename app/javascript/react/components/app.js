import React from 'react'
import { Router, browserHistory, Route, IndexRoute, Link } from 'react-router';
import DailyUpdate from './DailyUpdate/DailyUpdate'


export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={DailyUpdate} />
    </Router>
  )
}

export default App
