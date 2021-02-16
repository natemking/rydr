// import React, {createContext, useState, useEffect} from 'react';
// import AuthorizationService from "../Services/AuthorizationService";

// export const AuthorizationContext = createContext();

// export default ({children}) =>{
//     const [user, setUser]= useState(null);
//     const [isAuthenticated, setIsAuthenicated] = useState(false);
//     const [isLoaded, setIsLoaded] = useState(false);

//     useEffect(()=>{
//         AuthorizationService.isAuthenticated().then(data =>{
//             setUser(data.user);
//             setIsAuthenicated(data.isAuthenticated);
//             setIsLoaded(true);
//         })
//     }, [])

//     return (
//         <div>
//             {!isLoaded?<h1>Loading</h1>: 
//             <AuthorizationContext.Provider value={user, setUser, isAuthenticated,setIsAuthenicated}>
//                 {children}
//             </AuthorizationContext.Provider>}
//         </div>
//     )
// }