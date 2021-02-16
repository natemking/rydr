import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from '../Context/AuthorizationContext';
import {AuthServices} from '../Services/AuthorizationService'

const LogIn = () => {
const [user, setUser]= setState({})
const authContext = useContext(AuthContext)

const onChange=(e)=>{
    setUser({...user})
}

const onSubmit = e =>{
    e.preventdefault();
    AuthServices.login(user)
    .then(res =>{
        const {isAuth, user} = res
        if(isAuth)[
            auth
        ]

    })

}
    
    return (

    <div className="d-flex flex-column justify-content-center align-items-center">
        <img className="img-fluid" alt="ryder-logo" src="./imgs/vinyl-homepage-logo.png"></img>
        <h1 className="font-italic">Better Your Artist Experience</h1>
        <div className="d-flex justify-content-center mt-4">
            <form className="formcontent p-2">
                <div class="form-group ">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"></input>
                </div>
                <button type="submit" class="mx-2 artistCreateButton">Log In</button>
                <Link to="/createartist">
                    <button type="submit" class="mx-2 artistCreateButton">Create Account</button>
                </Link>
            </form>
        </div>
    </div>
    
     )
}
    
export default LogIn;