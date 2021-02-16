import React, {createContext, useState, useEffect} from 'react';
import AuthServices from "../Services/AuthorizationService";

export const AuthContext = createContext();

export default ({children}) =>{
    const [currentUser, setCurrentUser]= useState({});
    const [isAuth, setIsAuth] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        AuthServices.isAuthenticated().then(data =>{
            console.log(data, "this is data from auth route in context")
            setCurrentUser(data.user);
            setIsAuth(data.isAuthenticated);
            setIsLoaded(true);
        })
    }, [])

    return (
        <div>
            {!isLoaded?<h1>Loading</h1>: 
            <AuthContext.Provider value={currentUser, setCurrentUser, isAuth,setIsAuth}>
                {children}
            </AuthContext.Provider>}
        </div>
    )
}