import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
    this.fetchNotes = this.fetchNotes.bind(this)
    this.clickNotes = this.clickNotes.bind(this)
  }

  fetchNotes() {
    fetch(`/api/v1/notes`)
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
        notes: data
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  clickNotes(event){
    browserHistory.push(`/notes/${event.target.id}`)
  }

  componentDidMount(){
    this.fetchNotes()
  }

  render(){
    let notesHTML = this.state.notes.map(note => {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let date = new Date(note.updated_at)
      date = "Last updated: " + monthNames[date.getMonth()]+" "+date.getDate()+ ", "+date.getFullYear()

        return(
          <div
            key={note.id}
            id={note.id}
            className="note-name news-card cell small-24 medium-12 large-8"
            onClick={this.clickNotes}
            >
            {note.name}
            <p className="note-date">{date}</p>
          </div>
        )
    })

    return(
      <div>
        <h1>Notes</h1>
        <div id="new" className="standard-green-button" onClick={this.clickNotes}>New Note</div>
        <div className="grid-x grid-margin-x grid-margin-y">
          {notesHTML}
        </div>
      </div>
    );
  }
};

export default Notes
