import React from 'react';
import {Link} from 'react-router-dom'


const Home = () => {

    return (

    <div className="d-flex flex-column justify-content-center align-items-center">
    <img className="img-fluid" alt="ryder-logo" src="./imgs/vinyl-homepage-logo.png"></img>
    <h1 className="font-italic">Better Your Artist Experience</h1>
    <div className="d-flex justify-content-center mt-2">
    <Link to="/login">
    <button className="mx-2 homeaccountbutton" >Log In</button>
    </Link>
    <Link to="/createartist">
    <button className="mx-2 homeaccountbutton">Create Account</button>
    </Link>
    </div>
    </div>
    
     )
}
    
export default Home;