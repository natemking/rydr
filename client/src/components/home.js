import React from 'react';


const Home = () => {

    return (

    <div className="d-flex flex-column justify-content-center align-items-center">
    <img className="img-fluid" alt="ryder-logo" src="./imgs/vinyl-homepage-logo.png"></img>
    <h1 className="font-italic">Better Your Artist Experience</h1>
    <div className="d-flex justify-content-center mt-2">
    <button className="mx-2 homeaccountbutton" >Log In</button>
    <button className="mx-2 homeaccountbutton">Create Account</button>
    </div>
    </div>
    
     )
}
    
export default Home;