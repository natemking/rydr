import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AuthContext} from '../Context/AuthorizationContext'

const UserRoutes = ({component: Component, ...rest}) => {
    const {isAuth, user, id} = useContext(AuthContext)
    const bandpage = `/bandpage/${id}`
    return (
        <Route {...rest} render={props =>{
            if(isAuth){
                return <Redirect to={{pathname: bandpage, 
                                state: {from: props.location}}} />
            }
            return <Component {...props} />
        }} />
    )
}

export default UserRoutes