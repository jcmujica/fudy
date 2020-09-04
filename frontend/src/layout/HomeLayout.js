import React from 'react';
import NavBar from '../components/NavBar';

function HomeLayout(props) {
    return (
        <div className="columns is-multiline">
            <NavBar />
            <div className="column is-full home">
                {props.children}
            </div>
        </div>
    )
}

export default HomeLayout;
