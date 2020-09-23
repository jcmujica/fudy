import React from 'react';
import { isAuthenticated } from "../auth";

function SideBar(props) {
    const { setActiveComponent, activeComponent } = props;

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
                <li><p className={`sidebar__link ${activeComponent === 'profile' ? 'sidebar__active' : ''}`} onClick={() => handleComponentDisplay('profile')}><i className="fas fa-user-alt ml-1 mr-2"></i>My Profile</p></li>
            </ul>
            <p className="menu-label">
                Recipes
            </p>
            <ul className="menu-list">
                <li><p className={`sidebar__link ${activeComponent === 'recipe' ? 'sidebar__active' : ''}`} onClick={() => handleComponentDisplay('recipe')}><i className="fas fa-utensils ml-1 mr-2"></i>Create</p></li>
            </ul>
            {isAdmin ?
                <>
                    <p className="menu-label">
                        Ingredients
                    </p>
                    <ul className="menu-list">
                        <li><p className={`sidebar__link ${activeComponent === 'ingredient' ? 'sidebar__active' : ''}`} onClick={() => handleComponentDisplay('ingredient')}><i className="fas fa-pepper-hot ml-1 mr-2"></i> Manage</p></li>
                    </ul>
                </> : null}
        </aside>
    )
}

export default SideBar;
