import React, {createContext, useState, useEffect} from 'react';
import AuthServices from "../Services/AuthorizationService";

export const AuthContext = createContext();

export default ({children}) =>{
    const [user, setUser]= useState(null);
    const [isAuthenticated, setIsAuthenicated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        AuthServices.isAuthenticated().then(data =>{
            setUser(data.user);
            setIsAuthenicated(data.isAuthenticated);
            setIsLoaded(true);
        })
    }, [])

    return (
        <div>
            {!isLoaded?<h1>Loading</h1>: 
            <AuthContext.Provider value={user, setUser, isAuthenticated,setIsAuthenicated}>
                {children}
            </AuthContext.Provider>}
        </div>
    )
}