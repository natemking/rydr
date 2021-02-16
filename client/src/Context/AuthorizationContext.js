import React, {createContext, useState, useEffect} from 'react';
import AuthServices from "../Services/AuthorizationService";

export const AuthContext = createContext();

export default ({children}) =>{
    const [user, setUser]= useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        AuthServices.isAuthenticated().then(data =>{
            setUser(data.user);
            setIsAuth(data.isAuthenticated);
            setIsLoaded(true);
        })
    }, [])

    return (
        <div>
            {!isLoaded?<h1>Loading</h1>: 
            <AuthContext.Provider value={user, setUser, isAuth,setIsAuth}>
                {children}
            </AuthContext.Provider>}
        </div>
    )
}