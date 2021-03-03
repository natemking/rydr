import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from '../Context/AuthorizationContext'
// blocking routes for logged in users
const UserRoutes = ({component: Component, ...rest}) => {
    const {isAuth, id} = useContext(AuthContext)
    const bandpage = `/bandpage/${id}`
    return (
        // set up the route properties
        <Route {...rest} render={props =>{
            if(isAuth){
                // set up redirect if trying to access non user routes, like login
                return <Redirect to={{pathname: bandpage, 
                                state: {from: props.location}}} />
            }
            // otherwise return the set component with it's props
            return <Component {...props} />
        }} />
    )
}

export default UserRoutes