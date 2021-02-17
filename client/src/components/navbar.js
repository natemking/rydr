import { format } from 'morgan';
import React, {useContext} from 'react';
import {Link, history, useHistory} from 'react-router-dom'
import AuthServices from "../Services/AuthorizationService"
import {AuthContext} from '../Context/AuthorizationContext'

const NavBar = () => {
    const {isAuth, setCurrentUser, setIsAuth, setId, id} = useContext(AuthContext)
    const history = useHistory()
    const imgstyle = {
        maxHeight: "70px"
    }
    const headerstyle = {
        backgroundColor: "grey"
    }
    
    const logoutButton= () =>{
      AuthServices.logout()
      .then(res => {
        setCurrentUser("")
        setIsAuth(false)
        setId("")
        history.push("/")
      })
    }

    const navbarLogin = () =>{
      return(
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/">
              <h4 className="mx-2 navbutton">Home</h4>
            </Link><span className="sr-only">(current)</span>
          </li>
          <li className="nav-item">
            <Link to="/venuepage">
            <h4 className="mx-2 navbutton">Search Venues</h4>
            </Link>
          </li>
        </ul>
      )
    }
    const navbarUser = () =>{
      return(    
        <ul className="navbar-nav ml-auto">
          <li>
            <Link to={`/bandpage/${id}`}>
            <h4 className="mx-2 navbutton">My Band Page</h4>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/venuepage">
            <h4 className="mx-2 navbutton">Search Venues</h4>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/">
            <h4 className="mx-2 navbutton" onClick={logoutButton}>Sign Out</h4>
            </Link>
          </li>
        </ul>
      )
    }
    
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={headerstyle}>
        <img alt="ryder-logo" src="./imgs/vinyl-homepage-logo.png" style={imgstyle}></img>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
              {isAuth ? navbarUser() : navbarLogin()}
         </div>
      </nav>     
     )
}
    
export default NavBar;