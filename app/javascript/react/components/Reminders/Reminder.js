import React, { Component } from 'react';

class Reminder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminder: this.props.reminder.reminder
    };
    this.onChange = this.onChange.bind(this)
    this.updateReminder = this.updateReminder.bind(this)
    this.deleteReminder = this.deleteReminder.bind(this)
  }

  onChange(event){
    this.setState({reminder: event.target.value})
  }

  updateReminder(event){
    fetch(`/api/v1/reminders/${event.target.id}`, {
      method: 'PATCH',
      body: JSON.stringify({reminder: this.state.reminder}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
        credentials: 'same-origin'
    })
  }

  deleteReminder(event){
    fetch(`/api/v1/reminders/${event.target.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
        credentials: 'same-origin'
    })
    .then(data => data.json())
    .then(data => {
      this.props.updateReminders(data)
    })
  }

  render(){
    return(
      <div className="grid-x">
        <form className="cell small-24 medium-18 reminder-item">
          <input
            type="text"
            className="editable-text"
            id={this.props.reminder.id}
            value={this.state.reminder}
            onChange={this.onChange}
            onBlur={this.updateReminder}
          />
        </form>
        <div className="cell small-24 medium-6 reminder-controls">
          <span id={this.props.reminder.id} className="link" onClick={this.deleteReminder}>Delete</span>
        </div>
      </div>
    )
  }
}

export default Reminder
