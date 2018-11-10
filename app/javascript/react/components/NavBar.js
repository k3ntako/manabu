import React, { Component } from 'react';
import FullNavBar from './NavBar/FullNavBar'
import SmallNavBar from './NavBar/SmallNavBar'

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      smallNavBar: false
    };
    this.fetchUser = this.fetchUser.bind(this)
    this.signOut = this.signOut.bind(this)
    this.windowResizeHandler = this.windowResizeHandler.bind(this)
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
    if(this.state.smallNavBar && window.innerWidth > 640){
      this.setState({smallNavBar: false})
    }else if(!this.state.smallNavBar && window.innerWidth <= 640){
      this.setState({smallNavBar: true})
    }
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
      });
    });

    let navBarHTML = <FullNavBar
      currentUser={this.state.currentUser}
      children={children}
      signOut= {this.signOut}
      pathname={this.props.location.pathname}
    />
    if(this.state.smallNavBar){
      navBarHTML = (
        <SmallNavBar
          currentUser={this.state.currentUser}
          children={children}
          signOut= {this.signOut}
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
