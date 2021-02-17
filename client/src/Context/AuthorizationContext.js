import React, {createContext, useState, useEffect} from 'react';
import AuthServices from "../Services/AuthorizationService";

export const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [currentUser, setCurrentUser]= useState({});
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


         useEffect(() => {
             AuthServices.isAuthenticated().then(data => {
                 console.log(data, "this is data from auth route in context")
                 setCurrentUser(data.user);
                 setIsAuth(data.isAuthenticated);
                 setIsLoading(true);
             })
         }, [])

    return (
        <div>
            {!isLoading?<h1>Loading</h1>: 
            <AuthContext.Provider value={{currentUser, setCurrentUser, isAuth,setIsAuth}}>
                {children}
            </AuthContext.Provider>}
        </div>
    )
}
export default AuthProvider