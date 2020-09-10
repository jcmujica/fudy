import React, { useEffect, useState } from 'react';
import { getRecipes } from "../../core/apiCore";
import RecipeForm from "./RecipeForm";
import Loader from '../Loader';

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [activeRecipeId, setActiveRecipeId] = useState('');

    useEffect(() => {
        getRecipes().then(res => {
            setRecipes(res);
        });
    }, []);

    const editRecipe = (id) => {
        setActiveRecipeId(id)
    };

    return (
        <>
            {activeRecipeId &&
                <div>
                    <div>X</div>
                    <RecipeForm
                        mode={'edit'}
                        recipeId={activeRecipeId}
                    />
                </div>
            }
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th className="is-narrow">Recipe</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes ?
                        recipes.map((recipe => (
                            <tr onClick={() => editRecipe(recipe._id)} id={recipe._id} key={recipe._id}>
                                <th className="is-narrow">{recipe.name}</th>
                            </tr>
                        )))
                        : <Loader />}
                </tbody>
            </table>
        </>
    )
}

export default RecipeList
