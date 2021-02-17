import React, {useContext, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {AuthContext} from '../Context/AuthorizationContext';
import AuthServices from '../Services/AuthorizationService'
import API from '../utils/API';
import ModalAlert from './Modal'

const LogIn = () => {
const [user, setUser]= useState({userName:"", password:"", id:""})
const {setCurrentUser, setIsAuth, setId} = useContext(AuthContext);
let history = useHistory();

const onChange=(e)=>{
    setUser({...user, [e.target.name]: e.target.value})
}

const onSubmit = e =>{
    e.preventDefault();
    AuthServices.login(user)
    .then(res =>{
        if(res.isAuthenticated){
            setCurrentUser(res.userName)
            setIsAuth(res.isAuthenticated)
            API.getBandByUserId(res.id)
            .then(bandRes =>{
                console.log(bandRes, "this is band res")
                setId(bandRes.data[0]._id)
                history.push(`/bandpage/${bandRes.data[0]._id}`)
            })
        }else{
            
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