import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class SmallNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconClassName: "css-icon-menu"
    };
    this.onClickHandler = this.onClickHandler.bind(this)
    this.bodyClickHandler = this.bodyClickHandler.bind(this)
    this.clickLink = this.clickLink.bind(this)
    this.clickHome = this.clickHome.bind(this)
  }
  onClickHandler(){
    if(this.state.iconClassName === "css-icon-menu"){
      this.setState({iconClassName: "css-icon-close"})
    }else{
      this.setState({iconClassName: "css-icon-menu"})
    }
  }

  bodyClickHandler(){
    this.setState({iconClassName: "css-icon-menu"})
  }

  clickLink(event){
    let link = event.target.innerHTML.toLowerCase()
    this.setState({iconClassName: "css-icon-menu"},
      () => {browserHistory.push(`/${link}`)}
    )
  }

  clickHome(){
    this.setState({iconClassName: "css-icon-menu"})
  }

  render(){
    if(document.getElementById('nav-child')){
      document.getElementById('nav-child').addEventListener('click', this.bodyClickHandler);
    }

    let navDropDown
    if(this.state.iconClassName === "css-icon-close"){
      navDropDown = (
        <div className="grid-y nav-dropdown">
          <div className="nav-dropdown-item" onClick={this.clickLink}>
            Flashcards
          </div>
          <div className="nav-dropdown-item" onClick={this.clickLink}>
            Notes
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
                <div className={`${this.state.iconClassName} css-icon-icon`}></div>
              </li>
              <li className="menu-text nav-list-item" onClick={this.clickHome}>
                <Link id="title-link" to="/">Manabu</Link>
              </li>
            </ul>
          </div>
        </div>
        {navDropDown}
        <div className="grid-x" id="nav-child">
          <div className="cell small-22 small-offset-1 medium-20 medium-offset-2">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default SmallNavBar;
