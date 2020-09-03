import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import AuthUserContext from '../modules/session/auth/AuthUserContext';

export default function RequiresSignIn({path, component}) {
    const authToken = React.useContext(AuthUserContext)
    return (
        <div>
            {(authToken !== null) 
                ? <Route exact path={path} component={component} />: 
                <Route render={({location}) => <Redirect to={{ pathname: '/signin', state: {from: location} }}/>}/>}
        </div>
    )
}
