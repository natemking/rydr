import React from 'react';
import { Link } from 'react-router-dom';

const LogIn = () => {


    
    return (

    <div className="d-flex flex-column justify-content-center align-items-center">
    <img className="img-fluid" alt="ryder-logo" src="./imgs/vinyl-homepage-logo.png"></img>
    <h1 className="font-italic">Better Your Artist Experience</h1>
    <div className="d-flex justify-content-center mt-4">
    <form className="formcontent p-2">
    <div className="form-group ">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
    </div>
    <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
    </div>
    <button type="submit" className="mx-2 artistCreateButton">Log In</button>
    <Link to="/createartist">
    <button type="submit" className="mx-2 artistCreateButton">Create Account</button>
    </Link>
    </form>
    </div>
    </div>
    
     )
}
    
export default LogIn;