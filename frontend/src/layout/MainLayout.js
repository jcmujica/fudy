import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Profile from '../components/Profile';
import Liked from '../components/Liked';
import Ingredient from '../components/Ingredient';
import Recipe from '../components/Recipe';

function MainLayout(props) {
    const [activeComponent, setActiveComponent] = useState('liked');

    const renderComponent = (component) => {
        switch (component) {
            case 'profile':
                return <Profile />
            case 'likes':
                return <Liked />
            case 'recipe':
                return <Recipe />
            case 'ingredient':
                return <Ingredient />
            default:
                break;
        }
    }

    return (
        <div className="columns is-multiline" >
            <NavBar />
            <div className="column menu__container is-2">
                <SideBar
                    setActiveComponent={setActiveComponent}
                    activeComponent={activeComponent}
                />
            </div>
            <div className="container">
                <div className="column is-offset-2 is-10 dashboard">
                    {props.children}
                    {renderComponent(activeComponent)}
                </div>
            </div>
        </div>
    )
}

export default MainLayout
