import React, { Component } from 'react';
import FullNavBar from './NavBar/FullNavBar'
import SmallNavBar from './NavBar/SmallNavBar'
import DarkMode from './NavBar/DarkMode'

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      smallNavBar: false,
      darkMode: false
    };
    this.fetchUser = this.fetchUser.bind(this)
    this.signOut = this.signOut.bind(this)
    this.windowResizeHandler = this.windowResizeHandler.bind(this)
    this.renderFlash = this.renderFlash.bind(this)
    this.toggleDarkMode = this.toggleDarkMode.bind(this)
    this.sortBySequence = this.sortBySequence.bind(this)
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

  toggleDarkMode(){
    this.setState({darkMode: !this.state.darkMode},
    () =>{
      let darkMode = new DarkMode
      if(this.state.darkMode){
        darkMode.turnOnDarkMode()
      }else{
        darkMode.turnOffDarkMode()
      }
    })
  }

  signOut(){
    fetch(`/users/sign_out`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
      credentials: 'same-origin'
    })
    .then(reponse => {
      window.location.assign(`/users/sign_in`)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  };

  windowResizeHandler(){
    if(this.state.smallNavBar && window.innerWidth > 750){
      this.setState({smallNavBar: false})
    }else if(!this.state.smallNavBar && window.innerWidth <= 750){
      this.setState({smallNavBar: true})
    }
  }

  renderFlash(messages, type){
    let messagesHTML = []
    messages.forEach((message, idx) => {
      let key = Object.keys(message)[0];
      const classN = key === "error" ? "flash-alert" : "";
      messagesHTML.push(
        <div
          key={idx}
          className={`flash ${classN} flash-alert-under-nav`}
          >
          {message[key]}
        </div>
      )
    })
    return messagesHTML
  }

  sortBySequence(a,b){
    if (a.sequence < b.sequence){
      return -1;
    }
    return 1;
  }

  componentDidMount(){
    window.addEventListener("resize", this.windowResizeHandler);
    this.windowResizeHandler();
    this.fetchUser();
  };

  render(){
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        currentUser: this.state.currentUser,
        renderFlash: this.renderFlash,
        darkMode: this.state.darkMode,
        sortBySequence: this.sortBySequence
      });
    });

    let navBarHTML = <FullNavBar
      currentUser={this.state.currentUser}
      children={children}
      signOut= {this.signOut}
      pathname={this.props.location.pathname}
      toggleDarkMode={this.toggleDarkMode}
      darkMode={this.state.darkMode}
    />
    if(this.state.smallNavBar){
      navBarHTML = (
        <SmallNavBar
          currentUser={this.state.currentUser}
          children={children}
          signOut= {this.signOut}
          toggleDarkMode={this.toggleDarkMode}
          darkMode={this.state.darkMode}
        />
      )
    }



    return(
      <div>
        {navBarHTML}
      </div>
    )
  }
}

export default NavBar
