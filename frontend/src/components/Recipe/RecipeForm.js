import React, { useState, useEffect } from 'react';
import { isAuthenticated } from "../../auth";
import { getIngredients, createRecipes } from "../../core/apiCore";
import Loader from '../Loader';

function CreateRecipe(props) {
    const { mode } = props;
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;
    const [values, setValues] = useState({
        formData: ""
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
        setValues({
            ...values,
            formData: new FormData()
        });
        getIngredients()
            .then(res => {
                setAllIngredients(res)
                setShownIngredients(res)
            })
    }, []);

    useEffect(() => {
        const idsAlreadyAdded = recipeIngredients.map(el => el.id);
        const filteredIngredients = allIngredients.filter(el => !idsAlreadyAdded.includes(el._id));
        setShownIngredients(filteredIngredients);
    }, [recipeIngredients]);

    const handleChange = (name, id) => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        if (name === "unit" || name === "amount") {
            const foundIndex = recipeIngredients.findIndex(ingredient => ingredient.id === id);
            if (foundIndex >= 0) {
                const copyIngredients = [...recipeIngredients];
                copyIngredients[foundIndex][name] = value;
                setRecipeIngredients(copyIngredients);
            }
        } else {
            setValues({ ...values, [name]: value });
        }
    };

    const validateIngredientValues = (list) => {
        return list.map(element => Object.values(element).map((el) => el ? true : false)).flat().every(el => el === true);
    };

    const beforeSubmit = () => {
        if (!validateIngredientValues) {
            alert('All ingredients must contain all their respective values.');
            return;
        };
        formData.set('ingredients', JSON.stringify(recipeIngredients));
        fields.map((field) => {
            formData.set(field.name, values[field.name]);
        });
        console.log('FORM DATA', formData)
    };

    const addIngredient = (id) => {
        const foundIngredient = findIngredient(id);
        setRecipeIngredients([...recipeIngredients,
        {
            name: foundIngredient.name,
            id: id,
            amount: 0,
            unit: ''
        }]);
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
                        console.log(data);
                    }
                });
        } else {
            // updateRecipe(selectedRecipe._id, userId, token, formData)
            // .then(data => {
            //         if(data.error) {
            //             setValues({ ...values, error: data.error, loading: false });
            //         } else {
            //             console.log(data);
            //         }
            //     }
            // );
        }
    };

    const findIngredientValue = (id, value) => {
        console.log(id)
        console.log('values', values)
        const foundIngredient = recipeIngredients.find(ingredient => ingredient.id === id);
        return foundIngredient[value];
    };

    const findUnitValue = (unitString) => {
        return allUnits.find(unit => unit.value === unitString);
    };

    const deleteIngredientHandler = (id) => {
        const clearedIngredientsOnList = recipeIngredients.filter(ingredient => ingredient.id !== id);
        setRecipeIngredients(clearedIngredientsOnList);
    };

    return (
        <>
            <div className="columns is-multiline">
                <div className="column is-9">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        {fields.map(field => (
                            <div key={field.name} className="field is-horizontal">
                                <label className="field-label has-text-weight-bold auth__labels">{field.placeholder}</label>
                                <div className="control field-body">
                                    <input
                                        className="input"
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
                        <div className="control field-body">
                            <div className="file">
                                <label className="file-label">
                                    <input className="file-input is-link" type="file" id="photo" onChange={handleChange("photo")} name="photo" accept="image/*"></input>
                                    <span className="file-cta">
                                        <span className="file-icon">
                                            {/* <FontAwesomeIcon icon={[faUpload]} /> */}
                                        </span>
                                        <span className="file-label">Choose a file…</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="field is-centered auth__submit">
                            <div className="control">
                                <button type="submit" className="button is-link is-size-6">Create Recipe</button>
                            </div>
                        </div>
                        <table className="table is-bordered is-striped is-narrow is-hoverable">
                            <thead>
                                <tr>
                                    <th className="is-narrow">Ingredient</th>
                                    <th className="is-narrow">Amount</th>
                                    <th className="is-narrow">Unit</th>
                                    <th className="is-narrow">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recipeIngredients.map((ingredient) => (
                                    <tr key={ingredient.id}>
                                        <td>{ingredient.name}</td>
                                        <td><input type="number" value={ingredient.amount} onChange={handleChange('amount', ingredient.id)} /></td>
                                        <td>
                                            <select value={ingredient.unit} onChange={handleChange('unit', ingredient.id)} required>
                                                {allUnits.map(unit => (
                                                    <option>{unit.value}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td onClick={() => deleteIngredientHandler(ingredient.id)}>X</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </form>
                </div>
                <div className="column is-3">
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
                                        <th className="is-narrow">{ingredient.name}</th>
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