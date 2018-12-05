import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class SmallNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconClassName: "fa-bars"
    };
    this.onClickHandler = this.onClickHandler.bind(this)
    this.bodyClickHandler = this.bodyClickHandler.bind(this)
    this.clickLink = this.clickLink.bind(this)
    this.clickHome = this.clickHome.bind(this)
    this.clickToggleDarkMode = this.clickToggleDarkMode.bind(this)
  }
  onClickHandler(){
    if(this.state.iconClassName === "fa-bars"){
      this.setState({iconClassName: "fa-times"})
    }else{
      this.setState({iconClassName: "fa-bars"})
    }
  }

  bodyClickHandler(){
    this.setState({iconClassName: "fa-bars"})
  }

  clickLink(event){
    let link = event.target.innerHTML.toLowerCase()
    this.setState({iconClassName: "fa-bars"},
      () => {browserHistory.push(`/${link}`)}
    )
  }

  clickHome(){
    this.setState({iconClassName: "fa-bars"})
  }

  clickToggleDarkMode(){
    this.setState({iconClassName: "fa-bars"})
    this.props.toggleDarkMode()
  }

  render(){
    if(document.getElementById('nav-child')){
      document.getElementById('nav-child').addEventListener('click', this.bodyClickHandler);
    }

    let darkModeToggle = (<i className="far fa-sun"></i>)
    if(this.props.darkMode){
      darkModeToggle = (<i className="far fa-moon"></i>)
    }

    let navDropDown
    if(this.state.iconClassName === "fa-times"){
      navDropDown = (
        <div className="grid-y nav-dropdown">
          <div className="nav-dropdown-item" onClick={this.clickLink}>
            Flashcards
          </div>
          <div className="nav-dropdown-item" onClick={this.clickLink}>
            Notes
          </div>
          <div className="nav-dropdown-item" onClick={this.clickLink}>
            Reminders
          </div>
          <div className="nav-dropdown-item" onClick={this.clickToggleDarkMode}>
            {darkModeToggle}
          </div>
          <div className="nav-dropdown-item nav-user-options" onClick={this.props.signOut}>
            Sign Out
          </div>
        </div>
      )
    }
    
    return(
      <div>
        <div className="top-bar">
          <div className="top-bar-left">
            <ul className="menu" >
              <li className="nav-list-item" onClick={this.onClickHandler}>
                <i className={`fas ${this.state.iconClassName} fa-lg`}></i>
              </li>
              <li className="menu-text nav-list-item" onClick={this.clickHome}>
                <Link id="title-link" to="/">Manabu</Link>
              </li>
            </ul>
          </div>
        </div>
        {navDropDown}
        <div className="grid-x body" id="nav-child">
          <div className="cell small-22 small-offset-1 medium-20 medium-offset-2">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default SmallNavBar;
