import React, { Component } from 'react';
import { Link } from 'react-router';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };
    this.fetchUser = this.fetchUser.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  fetchUser(){
    fetch(`/api/v1/users`)
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
      this.setState({currentUser: data.user})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  signOut(){
    let jsonStringInfo = JSON.stringify(this.state.currentUser)
    fetch(`/users/sign_out`, {
      method: 'DELETE',
      body: jsonStringInfo,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
        credentials: 'same-origin'
      })
      .then(data => data.json())
      .then(newDefinitions => {
        console.log(newDefinitions);
      }
    )
  }

  componentDidMount(){
    this.fetchUser()
  }

  render(){
    let userSignInHTML = [
      (<li key="1"><a href="/users/sign_up">Sign Up</a></li>),
      (<li key="2"><a href="/users/sign_in">Sign In</a></li>)
    ]

    if(this.state.currentUser){
      userSignInHTML = (<li onClick={this.signOut}><a href="/users/sign_out">Sign Out</a></li>)
    }

    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        currentUser: this.state.currentUser,
      });
    });

    return(
      <div>
        <div className="top-bar">
          <div className="top-bar-left">
            <ul className="dropdown menu" data-dropdown-menu>
              <li className="menu-text"><Link id="title-link" to="/">Manabu</Link></li>
              <li><Link to="/flashcards">Flashcards</Link></li>
              <li><Link to="/notes">Notes</Link></li>
            </ul>
          </div>
          <div className="top-bar-right">
            <ul className="menu">
              {userSignInHTML}
            </ul>
          </div>
        </div>
        <div className="grid-x">
          <div className="cell small-22 small-offset-1 medium-20 medium-offset-2">
            {children}
          </div>
        </div>
      </div>
    )
  }
}

export default NavBar
