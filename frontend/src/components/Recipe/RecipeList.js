import React, { useEffect, useState } from 'react';
import { getUserRecipes } from "../../core/apiCore";
import { isAuthenticated } from "../../auth";
import Loader from '../Loader';

function RecipeList(props) {
    const { setSelectedRecipe, setMode, recipesUpdated, setRecipesUpdated } = props;
    const [recipes, setRecipes] = useState([]);
    const userId = isAuthenticated() && isAuthenticated().user._id;

    useEffect(() => {
        getUserRecipes(userId)
            .then(res => {
                setRecipes(res);
                setRecipesUpdated(false);
            });
    }, [userId, recipesUpdated, setRecipesUpdated]);

    const editRecipe = (recipe) => {
        setSelectedRecipe(recipe);
        setMode('edit');
    };

    return (
        <div className="recipe__list">
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
                            <tr onClick={() => editRecipe(recipe)} key={recipe._id}>
                                <th className="is-narrow capitalize">{recipe.name}</th>
                            </tr>
                        )))
                        : <Loader />}
                </tbody>
            </table>
        </div>
    )
}

export default RecipeList
