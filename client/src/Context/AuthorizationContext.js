import React, {createContext, useState, useEffect} from 'react';
import AuthServices from "../Services/AuthorizationService";
import API from "../utils/API"
export const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    // global states for auth and current user
    const [currentUser, setCurrentUser]= useState({});
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId]=useState()
        // set initial state for context
         useEffect(() => {
             AuthServices.isAuthenticated().then(data => {
                 setCurrentUser(data.user);
                 setIsAuth(data.isAuthenticated);
                 setIsLoading(true);

                API.getBandByUserId(data)
                .then(bandRes =>{
                    setId(bandRes.data[0]._id)
                });
             })
         }, [])

    return (
        <div>
            {/* loading h1 if page hasn't rendered right away.*/}
            {!isLoading?<h1>Loading</h1>: 
            <AuthContext.Provider value={{currentUser, setCurrentUser, isAuth,setIsAuth, setId, id}}>
                {children}
            </AuthContext.Provider>}
        </div>
    )
}
export default AuthProvider