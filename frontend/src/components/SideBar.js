import React from 'react';
import { signout, isAuthenticated } from "../auth";

function SideBar(props) {
    const { setActiveComponent } = props;

    const handleComponentDisplay = (component) => {
        setActiveComponent(component)
    };

    const { user } = isAuthenticated();
    const isAdmin = user && user.role === 1 ? true : false;

    return (
        <aside className="menu">
            {user ? <span>Hi {isAdmin ? 'Admin' : 'Chef'} {user.firstName}!</span> : null}
            <p className="menu-label">
                Profile
            </p>
            <ul className="menu-list">
                <li><a onClick={() => handleComponentDisplay('profile')}>My Profile</a></li>
            </ul>
            <p className="menu-label">
                Recipes
            </p>
            <ul className="menu-list">
                <li><a onClick={() => handleComponentDisplay('likes')}>Liked</a></li>
                <li><a onClick={() => handleComponentDisplay('myrecipes')}>MyRecipes</a></li>
                <li><a onClick={() => handleComponentDisplay('recipe')}>Create</a></li>
            </ul>
            {isAdmin ?
                <>
                    <p className="menu-label">
                        Ingredients
                    </p>
                    <ul className="menu-list">
                        <li><a onClick={() => handleComponentDisplay('ingredient')}>Add</a></li>
                    </ul>
                </> : null}
        </aside>
    )
}

export default SideBar;
