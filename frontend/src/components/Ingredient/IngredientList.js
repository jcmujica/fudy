import React, { useState, useEffect } from 'react';
import Loader from '../Loader';
import { isAuthenticated } from "../../auth";
import { getIngredients, deleteIngredient } from "../../core/apiCore";

function ListIngredients(props) {
    const { setSelectedIngredient, setMode, setIngredientsUpdated, ingredientsUpdated } = props;
    const [ingredients, setIngredients] = useState([]);
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    useEffect(() => {
        getIngredients()
            .then(res => setIngredients(res))
    }, []);

    useEffect(() => {
        getIngredients()
            .then(res => {
                setIngredientsUpdated(false);
                setIngredients(res);
            })
    }, [ingredientsUpdated, setIngredientsUpdated, setIngredients])

    const editIngredient = (ingredient) => {
        setSelectedIngredient(ingredient);
        setMode('edit');
    };

    const deleteIngredientHandler = (e, ingredient) => {
        e.stopPropagation();
        deleteIngredient(ingredient._id, userId, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setIngredientsUpdated(true);
                    console.log(data);
                }
            });
    };

    return (
        <>
            <h2 className="title">All Ingredients</h2>
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th className="is-narrow">Ingredient</th>
                        <th>Type</th>
                        <th className="has-text-info">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredients ?
                        ingredients.map((ingredient => (
                            <tr onClick={() => editIngredient(ingredient)} key={ingredient._id}>
                                <th className="is-narrow capitalize">{ingredient.name}</th>
                                <td>{ingredient.origin}</td>
                                <td
                                    onClick={(e) => deleteIngredientHandler(e, ingredient)}
                                    className="is-narrow has-text-centered has-text-info ingredient__deleteButton">
                                    <i className="far fa-trash-alt"></i>
                                </td>
                            </tr>
                        )))
                        : <Loader />}
                </tbody>
            </table>
        </>
    )
};

export default ListIngredients;