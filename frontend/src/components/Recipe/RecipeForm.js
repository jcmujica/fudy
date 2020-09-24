import React, { useState, useEffect } from 'react';
import { isAuthenticated } from "../../auth";
import { getIngredients, createRecipes, getRecipeById, updateRecipe, deleteRecipe } from "../../core/apiCore";
import Loader from '../Loader';
import ShowImage from '../ShowImage';

function CreateRecipe(props) {
    const { mode, selectedRecipe, setRecipesUpdated, setMode } = props;
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;
    const [values, setValues] = useState({
        formData: new FormData(),
        name: '',
        instructions: '',
        photoPreview: ''
    });
    const [allIngredients, setAllIngredients] = useState([]);
    const [shownIngredients, setShownIngredients] = useState([]);
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const { formData } = values;
    const fields = [
        { type: 'text', name: 'name', placeholder: 'Name', required: true },
        { type: 'textarea', name: 'instructions', placeholder: 'Instructions', required: true }
    ];

    const allUnits = [
        { value: '' },
        { value: 'Tea Spoon' },
        { value: 'Cup' },
        { value: 'Grams' },
        { value: 'Unit' },
        { value: 'l' },
        { value: 'ml' },
    ];

    useEffect(() => {
        getIngredients()
            .then(res => {
                setAllIngredients(res);
                setShownIngredients(res);
            });
    }, []);

    useEffect(() => {
        if (mode !== 'create') {
            getRecipeById(selectedRecipe._id)
                .then(res => {
                    mapEditValuesToLocal(res)
                });
        }
    }, [mode, selectedRecipe])

    useEffect(() => {
        if (recipeIngredients && recipeIngredients.length > 0) {
            const idsAlreadyAdded = recipeIngredients.map(el => el._id);
            const filteredIngredients = allIngredients.filter(el => !idsAlreadyAdded.includes(el._id));
            setShownIngredients(filteredIngredients);
        };
    }, [recipeIngredients, allIngredients]);

    const mapEditValuesToLocal = (recipe) => {
        setValues({ ...values, name: recipe.name, instructions: recipe.instructions });
        setRecipeIngredients(recipe.ingredients);
    };

    const handleChange = (name, id) => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        if (name === "unit" || name === "amount") {
            const foundIndex = recipeIngredients.findIndex(ingredient => ingredient._id === id);
            if (foundIndex >= 0) {
                const copyIngredients = [...recipeIngredients];
                copyIngredients[foundIndex][name] = value;
                setRecipeIngredients(copyIngredients);
            }
        } else {
            setValues({ ...values, [name]: value });
            if (name === "photo") {
                setValues({ ...values, [name]: value, photoPreview: URL.createObjectURL(value) });
            }
        };
    };

    const validateIngredientValues = (list) => {
        return list.map(element => Object.values(element).map((el) => el ? true : false)).flat().every(el => el === true);
    };

    const beforeSubmit = () => {
        console.log('values', values)
        if (!validateIngredientValues) {
            alert('All ingredients must contain all their respective values.');
            return;
        };
        formData.set('ingredients', JSON.stringify(recipeIngredients));
        fields.map((field) => (formData.set(field.name, values[field.name])));
        if (values.photo) {
            formData.set('photo', values.photo);
        }
        formData.set('user', userId);
    };

    const addIngredient = (id) => {
        const foundIngredient = findIngredient(id);
        const newIngredient = {
            name: foundIngredient.name,
            _id: id,
            amount: 0,
            unit: ''
        }
        setRecipeIngredients([...recipeIngredients, newIngredient]);
    };

    const findIngredient = (id) => {
        return allIngredients.filter(ingredient => ingredient._id === id)[0];
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        beforeSubmit();
        setValues({ ...values, error: false, loading: true });

        if (mode === 'create') {
            createRecipes(userId, token, formData)
                .then(data => {
                    if (data.error) {
                        setValues({ ...values, error: data.error, loading: false });
                    } else {
                        setRecipesUpdated(true);
                        clear();
                        console.log(data);
                    }
                });
        } else {
            updateRecipe(selectedRecipe._id, userId, token, formData)
                .then(data => {
                    if (data.error) {
                        setValues({ ...values, error: data.error, loading: false });
                    } else {
                        setRecipesUpdated(true);
                        clear();
                        console.log(data);
                    }
                });
        }
    };

    const deleteIngredientHandler = (id) => {
        const clearedIngredientsOnList = recipeIngredients.filter(ingredient => ingredient._id !== id);
        setRecipeIngredients(clearedIngredientsOnList);
    };

    const deleteRecipeHandler = (e) => {
        e.stopPropagation();
        deleteRecipe(selectedRecipe._id, userId, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setRecipesUpdated(true);
                    clear();
                    console.log(data);
                }
            });
    };

    const clear = (e) => {
        if (e) {
            e.preventDefault();
        };
        setValues({
            ...values,
            name: '',
            instructions: '',
            ingredients: '',
            photoPreview: '',
            formData: new FormData()
        })
        setMode('create');
    };

    return (
        <>
            <div className="columns is-multiline mb-2">
                <div className="column is-10">
                    <h2 className="title">{mode === 'edit' ? 'Edit Recipe' : 'Create Recipe'}</h2>
                    <ShowImage item={selectedRecipe} url="recipe" photoPreview={values.photoPreview} />
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="control field-body recipe__upload">
                            <div className="file is-dark">
                                <label className="file-label">
                                    <input className="file-input is-link" type="file" id="photo" onChange={handleChange("photo")} name="photo" accept="image/*"></input>
                                    <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fas fa-upload"></i>
                                        </span>
                                        <span className="file-label">Choose a file…</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                        {fields.map(field => (
                            <div key={field.name} className="field is-horizontal">
                                <label className="field-label has-text-weight-bold auth__labels">{field.placeholder}</label>
                                <div className="control field-body">
                                    <input
                                        className="input capitalize"
                                        name={field.name}
                                        value={values[field.name]}
                                        onChange={handleChange(field.name)}
                                        placeholder={field.placeholder}
                                        required={field.required}
                                        type={field.type}
                                    />
                                </div>
                            </div>)
                        )}
                        <div className="field is-centered auth__submit">
                            <div className="control">
                                <button type="submit" className="button is-link is-size-6">{mode === 'edit' ? 'Edit Recipe' : 'Create Recipe'}</button>
                                <button
                                    type="button"
                                    className="button is-primary is-size-6 ml-4"
                                    onClick={deleteRecipeHandler}
                                >
                                    <i className="far fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                        <table className="table is-bordered is-striped is-narrow is-hoverable">
                            <thead>
                                <tr>
                                    <th className="is-narrow">Ingredient</th>
                                    <th className="is-narrow">Amount</th>
                                    <th className="is-narrow">Unit</th>
                                    <th className="is-narrow has-text-centered">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recipeIngredients && recipeIngredients.map((ingredient) => (
                                    <tr key={ingredient._id}>
                                        <td className="capitalize">{ingredient.name}</td>
                                        <td><input type="number" value={ingredient.amount} onChange={handleChange('amount', ingredient._id)} /></td>
                                        <td>
                                            <select value={ingredient.unit} onChange={handleChange('unit', ingredient._id)} required>
                                                {allUnits.map(unit => (
                                                    <option key={unit.value}>{unit.value}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td
                                            onClick={() => deleteIngredientHandler(ingredient._id)}
                                            className="is-narrow has-text-centered has-text-info recipe__deleteButton"
                                        >
                                            <i className="far fa-trash-alt"></i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </form>
                </div>
                <div className="column is-2">
                    <h2 className="subtitle">Add Ingredients</h2>
                    <table className="table is-bordered is-striped is-narrow is-hoverable">
                        <thead>
                            <tr>
                                <th className="is-narrow">Ingredients</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shownIngredients ?
                                shownIngredients.map((ingredient => (
                                    <tr onClick={() => addIngredient(ingredient._id)} key={ingredient._id}>
                                        <th className="is-narrow capitalize">{ingredient.name}</th>
                                    </tr>
                                )))
                                : <Loader />}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default CreateRecipe
