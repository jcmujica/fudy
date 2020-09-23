import React, { useState } from 'react';
import RecipeForm from './RecipeForm';
import RecipeList from './RecipeList';

function Recipe() {
    const [mode, setMode] = useState('create');
    const [selectedRecipe, setSelectedRecipe] = useState({});
    const [recipesUpdated, setRecipesUpdated] = useState(false);

    return (
        <div>
            <RecipeForm
                mode={mode}
                setMode={setMode}
                selectedRecipe={selectedRecipe}
            />
            <RecipeList
                setMode={setMode}
                setSelectedRecipe={setSelectedRecipe}
            />
        </div>
    )
}

export default Recipe;