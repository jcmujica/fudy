import React, { useState, useEffect } from 'react';
import Loader from '../Loader';
import { isAuthenticated } from "../../auth";
import { getIngredients, deleteIngredient } from "../../core/apiCore";

function ListIngredients(props) {
    const { setSelectedIngredient, setMode } = props;
    const [ingredients, setIngredients] = useState([]);
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    useEffect(() => {
        getIngredients()
            .then(res => setIngredients(res))
    }, []);

    const editIngredient = (e) => {
        e.stopPropagation();
        const id = e.currentTarget.id;
        const selectedIngredient = findIngredient(id);
        console.log(selectedIngredient);
        setSelectedIngredient(selectedIngredient);
        setMode('edit');
    };

    const deleteIngredientHandler = (e) => {
        e.stopPropagation();
        const ingredientId = e.currentTarget.id;
        deleteIngredient(ingredientId, userId, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    console.log(data);
                }
            });
    };

    const findIngredient = (id) => {
        return ingredients.filter(ingredient => ingredient._id === id)[0];
    };

    return (
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th className="is-narrow">Ingredient</th>
                    <th>Type</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {ingredients ?
                    ingredients.map((ingredient => (
                        <tr onClick={editIngredient} id={ingredient._id} key={ingredient._id}>
                            <th className="is-narrow">{ingredient.name}</th>
                            <td>{ingredient.origin}</td>
                            <td onClick={deleteIngredientHandler} id={ingredient._id}>X</td>
                        </tr>
                    )))
                    : <Loader />}
            </tbody>
        </table>)
};

export default ListIngredients;