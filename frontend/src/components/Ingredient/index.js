import React, { useState } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';

function Ingredient() {
    const [mode, setMode] = useState('create');
    const [selectedIngredient, setSelectedIngredient] = useState({});
    const [ingredientsUpdated, setIngredientsUpdated] = useState(false);

    return (
        <div className="ingredient">
            <IngredientForm
                mode={mode}
                setMode={setMode}
                selectedIngredient={selectedIngredient}
                setIngredientsUpdated={setIngredientsUpdated}
                />
            <IngredientList
                setMode={setMode}
                setSelectedIngredient={setSelectedIngredient}
                ingredientsUpdated={ingredientsUpdated}
                setIngredientsUpdated={setIngredientsUpdated}
            />
        </div>
    )
}

export default Ingredient;
