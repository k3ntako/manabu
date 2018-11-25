import React, { Component } from 'react';
import Reminder from '../Reminders/Reminder'

class RemindersWidget extends Component {
constructor(props) {
    super(props);
    this.state = {
      reminders: []
    };
    this.fetchTodaysRemidners = this.fetchTodaysRemidners.bind(this);
  }

  fetchTodaysRemidners(){
    fetch("/api/v1/reminders/today")
    .then(response => {
      if (response.ok) {
        return response;
      }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({reminders: data.reminders})
    });
  }

  componentDidMount(){
    this.fetchTodaysRemidners();
  }

  render(){
    let remindersHTML = this.state.reminders.map(reminder => {
      return(
        <li key={reminder.id}>{reminder.reminder}</li>
      )
    })
    return(
      <div className="cell small-24 medium-12 todays-reminders-container">
        <h4>Today's Reminders</h4>
        <div className="todays-reminders">
          {remindersHTML}
        </div>
      </div>
    )
  }
}

export default RemindersWidget
