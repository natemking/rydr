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
            <button className="mx-2 navbutton">Home</button>
      </Link><span className="sr-only">(current)</span>
      </li>
      <li className="nav-item">
      <Link to="/createartist">
          <button className="mx-2 navbutton">Create Artist</button>
      </Link>
      </li>
      <li className="nav-item">
      <Link to="/bandpage">
         <button className="mx-2 navbutton">Band Page</button>
      </Link>
      </li>
      <li className="nav-item">
        <Link to="/venuepage">
        <button className="mx-2 navbutton">Venues</button>
        </Link>
      </li>
    </ul>
  </div>
</nav>     

     )
}
    
export default NavBar;