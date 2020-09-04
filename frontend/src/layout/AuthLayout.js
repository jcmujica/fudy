import React from 'react';
import NavBar from '../components/NavBar';

function AuthLayout(props) {
    return (
        <div className="container auth__fullHeight">
            <NavBar/>
            <div className="columns is-vcentered auth__fullHeight is-multiline is-centered" >
                <div className="column is-half has-background-info auth__container" >
                    {props.children}
                </div>
            </div>
        </div>
    )
};

export default AuthLayout
