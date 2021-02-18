import React, {useContext, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {AuthContext} from '../Context/AuthorizationContext';
import AuthServices from '../Services/AuthorizationService'
import API from '../utils/API';
import Modal from './Modal'

const LogIn = () => {
    // useHistory hook for routing
    let history = useHistory();

    // State for username & pw
    const [user, setUser]= useState({userName:"", password:"", id:""});
    // State for modal error message
    const [errMsg, setErrMsg] = useState('');
    // State for modal visibility
    const [show, setShow] = useState(false);

    // Context for authentication
    const {setCurrentUser, setIsAuth, setId} = useContext(AuthContext);
    
    // Set state with user input
    const onChange=(e)=>{
        setUser({...user, [e.target.name]: e.target.value})
    }

    // Modal functions for closing and showing
    const handleClose = () => setShow(false); 
    const handleShow = () => setShow(true);

    // On submit verify authentication and send the user to their band page. On fail display modal and reset input fields
    const onSubmit = e =>{
        e.preventDefault();
        AuthServices.login(user)
        .then(res =>{
            if(res.isAuthenticated){
                setCurrentUser(res.userName)
                setIsAuth(res.isAuthenticated)
                API.getBandByUserId(res.id)
                .then(bandRes =>{
                    setId(bandRes.data[0]._id)
                    history.push(`/updateartist/${bandRes.data[0]._id}`)
                });
            } else {
                document.getElementById('passwordInput').value = '';
                document.getElementById('emailInput').value = '';
                setErrMsg('Wrong username or password');
                handleShow();
            }
        });
    }    

    // Render login form
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">

            <img className="img-fluid" alt="ryder-logo" src="./imgs/vinyl-homepage-logo.png" />
            <h1 className="font-italic">
                Better Your Artist Experience
            </h1>
            
            <div className="d-flex justify-content-center mt-4">
                <form className="formcontent p-2">
                    <div className="form-group ">
                        <label htmlFor="emailInput">
                            Email address
                        </label>
                        <input type="email" onChange={onChange} name='userName' className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="passwordInput">
                            Password
                        </label>
                        <input type="password" onChange={onChange} name="password" className="form-control" id="passwordInput" placeholder="Password" />
                    </div>

                    <button type="submit" onClick={onSubmit} className="mx-2 artistCreateButton">
                        Log In
                    </button>

                    <Link to="/createartist">
                        <button className="mx-2 artistCreateButton">
                            Create Account
                        </button>
                    </Link>
                </form>

                <Modal show={show} handleClose={handleClose} error={errMsg} />
                
            </div>
        </div>
    )
}
    
export default LogIn;