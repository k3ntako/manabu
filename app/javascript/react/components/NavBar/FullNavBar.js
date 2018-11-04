import React from 'react';
import { Link } from 'react-router';

const FullNavBar = (props) => {
  let destinations = ["flashcards", "notes"]
  let destinationsHTML = destinations.map(dest =>{
    let className = "nav-link"
    if(props.pathname.includes(dest)){
      className += " nav-active-link"
    }
    return(
      <li key={dest} className="nav-list-item">
        <Link className={className} to={`/${dest}`}>
          {dest[0].toUpperCase() + dest.slice(1)}
        </Link>
      </li>
    )
  })

  let userSignInHTML = [
    (<li key="1" className="nav-list-item"><a href="/users/sign_up">Sign Up</a></li>),
    (<li key="2" className="nav-list-item"><a href="/users/sign_in">Sign In</a></li>)
  ];

  if(props.currentUser){
    userSignInHTML = (<li onClick={this.signOut}><a href="/users/sign_out">Sign Out</a></li>)
  };

  return(
    <div>
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text nav-list-item"><Link id="title-link" to="/">Manabu</Link></li>
            {destinationsHTML}
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
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default FullNavBar;
