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
                setRecipesUpdated={setRecipesUpdated}
            />
            <RecipeList
                setMode={setMode}
                setSelectedRecipe={setSelectedRecipe}
                recipesUpdated={recipesUpdated}
                setRecipesUpdated={setRecipesUpdated}
            />
        </div>
    )
}

export default Recipe;