import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from '../Context/AuthorizationContext'
// blocking access to non users
const UserRoutes = ({component: Component, ...rest}) => {
    const {isAuth, user} = useContext(AuthContext)
    return (
        // setup route properties
        <Route {...rest} render={props =>{
            if(!isAuth){
                // not authorized link or reroute to home page
                return <Redirect to={{pathname: '/', 
                                state: {from: props.location}}} />
            }
            // return the initial component with it's properties.
            return <Component {...props} />
        }} />
    )
}

export default UserRoutes
