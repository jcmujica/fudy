import React, { useState, useEffect } from 'react';
import { getIngredients } from "../../core/apiCore";
import Loader from '../Loader';

function CreateRecipe(props) {
    const { mode } = props;

    const [values, setValues] = useState({});
    const [allIngredients, setAllIngredients] = useState([]);
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const { mappedFields, formData } = values;
    const fields = [
        { type: 'text', name: 'name', placeholder: 'Name', required: true },
        { type: 'textarea', name: 'instructions', placeholder: 'Instructions', required: true }
    ];

    useEffect(() => {
        getIngredients()
            .then(res => setAllIngredients(res))
    }, []);

    useEffect(() => {
        const idsAlreadyAdded = recipeIngredients.map(el => el._id);
        console.log('ids already added', idsAlreadyAdded)
        const filteredIngredients = allIngredients.filter(el => !idsAlreadyAdded.includes(el._id));
        // console.log(filteredIngredients)
        setAllIngredients(filteredIngredients)
    }, [recipeIngredients]);

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        if (name === "origin") {
            setValues({ ...values, origin: value });
        } else {
            setValues({ ...values, [name]: value });
        }
    };

    const beforeSubmit = () => {
        mappedFields.map((field) => {
            formData.set(field, values[field]);
        });
    };

    const addIngredient = (e) => {
        e.stopPropagation();
        const id = e.currentTarget.id;
        const selectedIngredient = findIngredient(id);
        console.log(selectedIngredient);
        setRecipeIngredients([...recipeIngredients, selectedIngredient]);
    };

    const findIngredient = (id) => {
        return allIngredients.filter(ingredient => ingredient._id === id)[0];
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        beforeSubmit();
        setValues({ ...values, error: false, loading: true });

        if (mode === 'create') {
            // createRecipes(userId, token, formData)
            //     .then(data => {
            //         if (data.error) {
            //             setValues({ ...values, error: data.error, loading: false });
            //         } else {
            //             console.log(data);
            //         }
            //     });
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
                                </tr>
                            </thead>
                            <tbody>

                                {recipeIngredients && recipeIngredients.map((ingredient) => (
                                    <tr key={ingredient._id}>
                                        <td>{ingredient.name}</td>
                                        <td><input type="number"/></td>
                                        <td>
                                            <select>
                                                <option>Tea Spoon</option>
                                                <option>Cup</option>
                                                <option>Grams</option>
                                            </select>
                                        </td>
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
                            {allIngredients ?
                                allIngredients.map((ingredient => (
                                    <tr onClick={addIngredient} id={ingredient._id} key={ingredient._id}>
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
