import React, {useContext, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {AuthContext} from '../Context/AuthorizationContext';
import AuthServices from '../Services/AuthorizationService'
import ModalAlert from './Modal'

const LogIn = () => {
const [user, setUser]= useState({userName:"", password:""})
const {setCurrentUser, setIsAuth, currentUser, isAuth} = useContext(AuthContext);
let history = useHistory();

  console.log(currentUser, isAuth, "this is in this is in main-logins")
const onChange=(e)=>{
    console.log(e.target.value)
    setUser({...user, [e.target.name]: e.target.value})
}

const onSubmit = e =>{
    e.preventDefault();
    console.log(user)
    AuthServices.login(user)
    .then(res =>{
        if(res.isAuthenticated){
            console.log("in if")
            setCurrentUser(res.userName)
            setIsAuth(res.isAuthenticated)
            history.push("/bandpage")
        }else{
            return <ModalAlert></ModalAlert>
        }
    })
}    

    return (

    <div className="d-flex flex-column justify-content-center align-items-center">
    <img className="img-fluid" alt="ryder-logo" src="./imgs/vinyl-homepage-logo.png"></img>
    <h1 className="font-italic">Better Your Artist Experience</h1>
    <div className="d-flex justify-content-center mt-4">
    <form className="formcontent p-2">
    <div className="form-group ">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" onChange={onChange} name='userName' value={user.userName} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
    </div>
    <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" onChange={onChange} value={user.password} name="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
    </div>
    <button type="submit" onClick={onSubmit} className="mx-2 artistCreateButton">Log In</button>
    <Link to="/createartist">
    <button className="mx-2 artistCreateButton">Create Account</button>
    </Link>
    </form>
    </div>
    </div>
    
    )
}
    
export default LogIn;