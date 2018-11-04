import React, { Component } from 'react';
import { Link } from 'react-router';


class SmallNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconClassName: "css-icon-menu"
    };
    this.onClickHandler = this.onClickHandler.bind(this)
  }
  onClickHandler(){
    if(this.state.iconClassName === "css-icon-menu"){
      this.setState({iconClassName: "css-icon-close"})
    }else{
      this.setState({iconClassName: "css-icon-menu"})
    }
  }

  render(){
    let userSignInHTML = [
      (<div key="1" className="nav-dropdown-item nav-user-options"><a href="/users/sign_up">Sign Up</a></div>),
      (<div key="2" className="nav-dropdown-item"><a href="/users/sign_in">Sign In</a></div>)
    ];

    if(this.props.currentUser){
      userSignInHTML = (
        <div className="nav-dropdown-item nav-user-options" onClick={this.props.signOut}>
          <a href="/users/sign_out">Sign Out</a>
        </div>
      )
    };

    let navDropDown
    if(this.state.iconClassName === "css-icon-close"){
      navDropDown = (
        <div className="grid-y nav-dropdown">
          <div className="nav-dropdown-item"><Link to="/flashcards">Flashcards</Link></div>
          <div className="nav-dropdown-item"><Link to="/notes">Notes</Link></div>
          {userSignInHTML}
        </div>
      )
    }

    return(
      <div>
        <div className="top-bar">
          <div className="top-bar-left">
            <ul className="menu" >
              <li className="nav-list-item" onClick={this.onClickHandler}>
                <div className={`${this.state.iconClassName} css-icon-icon`}></div>
              </li>
              <li className="menu-text nav-list-item"><Link id="title-link" to="/">Manabu</Link></li>
            </ul>
          </div>
        </div>
        {navDropDown}
        <div className="grid-x">
          <div className="cell small-22 small-offset-1 medium-20 medium-offset-2">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default SmallNavBar;
