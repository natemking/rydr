import React from 'react';
import {Link} from 'react-router-dom'


const NavBar = () => {
    const imgstyle = {
        maxHeight: "70px"
    }
    const headerstyle = {
        backgroundColor: "grey"
    }
    
    return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={headerstyle}>
    <img alt="ryder-logo" src="./imgs/vinyl-logo.png" style={imgstyle}></img>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
      <Link to="/">
            <h4 className="mx-2 navbutton">Home</h4>
      </Link><span className="sr-only">(current)</span>
      </li>
      <li className="nav-item">
      <Link to="/bandpage">
         <h4 className="mx-2 navbutton">My Band Page</h4>
      </Link>
      </li>
      <li className="nav-item">
        <Link to="/venuepage">
        <h4 className="mx-2 navbutton">Search Venues</h4>
        </Link>
      </li>
    </ul>
  </div>
</nav>     

     )
}
    
export default NavBar;