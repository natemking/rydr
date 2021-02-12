import React from 'react';
import {Link} from 'react-router-dom'


const Header = () => {
    const buttonStyle = {
        backgroundColor: "black",
        color: "white",
        borderRadius: "5px",
        border: "1px solid white",
        fontSize: "20px",
        padding: "4px"
        }
    const headerstyle = {
        backgroundColor: "grey"
    }
    
    return (

        <div style={headerstyle}>
        <h1 className="text-center mb-0">RYDER</h1>
        <h3 className="text-center">Better Your Band Experience</h3>
        <div className="d-flex flex-row justify-content-center">
            <Link to="/">
            <button style={buttonStyle} className="mx-2">Home</button>
            </Link>
            <Link to="/createartist">
            <button style={buttonStyle} className="mx-2">Create Artist</button>
            </Link>
            <Link to="/bandpage">
            <button style={buttonStyle} className="mx-2">My Band Page</button>
            </Link>
            <Link to="/venuepage">
            <button style={buttonStyle} className="mx-2">Look for Venues</button>
            </Link>
        </div>
        <hr></hr>
        </div>
    
     )
}
    
export default Header;