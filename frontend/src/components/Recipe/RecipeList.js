import React, { useEffect, useState } from 'react';
import { getUserRecipes } from "../../core/apiCore";
import { isAuthenticated } from "../../auth";
import RecipeForm from "./RecipeForm";
import Loader from '../Loader';

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [activeRecipeId, setActiveRecipeId] = useState('');
    const userId = isAuthenticated() && isAuthenticated().user._id;

    useEffect(() => {
        getUserRecipes(userId).then(res => {
            setRecipes(res);
        });
    }, [userId]);

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
            <h2 className="title">My Recipes</h2>
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
