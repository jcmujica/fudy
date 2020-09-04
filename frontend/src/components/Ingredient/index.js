import React, { useState } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';

function Ingredient() {
    const [mode, setMode] = useState('create');
    const [selectedIngredient, setSelectedIngredient] = useState({});

    return (
        <div>
            <IngredientForm mode={mode} setMode={setMode} selectedIngredient={selectedIngredient} />
            <IngredientList setMode={setMode} setSelectedIngredient={setSelectedIngredient} />
        </div>
    )
}

export default Ingredient;
