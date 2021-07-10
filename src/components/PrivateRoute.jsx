import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// console.log(localStorage.getItem("icUserdata"));
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('icUserdata')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)