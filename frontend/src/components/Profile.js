import React from 'react';
import { isAuthenticated } from "../auth";

function Profile() {
    const { user } = isAuthenticated();

    return (
        <>
            <h2 className="title mb-6">{`Name: ${user.firstName} ${user.lastName}`}</h2>
            <h3 className="subtitle">{`Email: ${user.email}`}</h3>
        </>
    )
}

export default Profile;
