import React, { Component } from 'react';
import { Link } from 'react-router';

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
    this.fetchNotes = this.fetchNotes.bind(this)
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

  componentDidMount(){
    this.fetchNotes()
  }

  render(){
    let notesHTML = this.state.notes.map(note => {
        return(
          <li key={note.id}><Link to={`/notes/${note.id}`}>{note.name}</Link></li>
        )
    })

    return(
      <div>
        <h1>Notes</h1>
        <div><Link to="/notes/new/">New Note</Link></div>
        {notesHTML}
      </div>
    );
  }
};

export default Notes
