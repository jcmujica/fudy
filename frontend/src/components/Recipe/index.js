import React, { useState } from 'react';
import RecipeForm from './RecipeForm';

function Recipe() {
    const [mode, setMode] = useState('create')
    return (
        <div>
            <RecipeForm mode={mode}/>
        </div>
    )
}

export default Recipe;