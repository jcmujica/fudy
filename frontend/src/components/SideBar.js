import React from 'react';

function SideBar(props) {
    const { setActiveComponent } = props;

    const handleComponentDisplay = (component) => {
        setActiveComponent(component)
    }

    return (
        <aside className="menu">
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
                <li><a onClick={() => handleComponentDisplay('recipe')}>Create</a></li>
            </ul>
            <p className="menu-label">
                Ingredients
            </p>
            <ul className="menu-list">
                <li><a onClick={() => handleComponentDisplay('ingredient')}>Add</a></li>
            </ul>
        </aside>
    )
}

export default SideBar;
