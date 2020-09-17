import React from 'react';
import { signout, isAuthenticated } from "../auth";

function Profile() {
    const { user } = isAuthenticated();

    return (
        <>
            <div>{user.firstName}</div>
            <div>{user.lastName}</div>
            <div>{user.email}</div>
        </>
    )
}

export default Profile;
