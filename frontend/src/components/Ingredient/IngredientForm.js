import React, { useState, useEffect } from 'react';
import { isAuthenticated } from "../../auth";
import { createIngredients, getOriginValues, updateIngredient } from "../../core/apiCore";
import ShowImage from '../ShowImage';

function IngredientForm(props) {

    const { setMode, mode, selectedIngredient, setIngredientsUpdated } = props;
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;
    const fields = [
        { type: 'text', name: 'name', placeholder: 'Name', required: true }
    ];

    const [values, setValues] = useState({
        name: "",
        origin: 'Other',
        photo: "",
        originList: [],
        mappedFields: ['name', 'origin', 'photo'],
        error: "",
        formData: "",
        loading: false
    });

    const { formData, originList, origin, mappedFields } = values;

    const init = () => {
        getOriginValues(userId, token)
            .then(res => {
                setValues({
                    ...values,
                    originList: res,
                    formData: new FormData()
                });
                if (mode === 'edit') {
                    setValues({
                        ...values,
                        name: selectedIngredient.name,
                        origin: selectedIngredient.origin,
                        formData: new FormData()
                    });
                }
            });
    };

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        init();
    }, [mode, selectedIngredient])

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        if (name === "origin") {
            setValues({ ...values, origin: value });
        } else {
            setValues({ ...values, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        beforeSubmit();
        setValues({ ...values, error: false, loading: true });

        if (mode === 'create') {
            createIngredients(userId, token, formData)
                .then(data => {
                    if (data.error) {
                        setValues({ ...values, error: data.error, loading: false });
                    } else {
                        setIngredientsUpdated(true);
                    }
                });
        } else {
            updateIngredient(selectedIngredient._id, userId, token, formData)
                .then(data => {
                    if (data.error) {
                        setValues({ ...values, error: data.error, loading: false });
                    } else {
                        setIngredientsUpdated(true);
                    }
                }
                );
        };
    };

    const beforeSubmit = () => {
        mappedFields.map((field) => {
            formData.set(field, values[field]);
        });
    };

    const clear = (e) => {
        e.preventDefault()
        setValues({
            ...values,
            name: '',
            origin: '',
            formData: new FormData()
        })
        setMode('create');
    };

    return (
        <div className="ingredient__form">
            <h2 className="title">{mode === 'edit' ? 'Edit' : 'Create'} Ingredient</h2>
            <ShowImage item={selectedIngredient} url={mode === "edit" ? "ingredient" : ""} />
            <form className="mb-6" onSubmit={(e) => handleSubmit(e)}>
                <div className="control field-body ingredient__upload">
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
                <div key="origin" className="field is-horizontal">
                    <label className="field-label has-text-weight-bold auth__labels">Origin</label>
                    <div className="control field-body">
                        <div className="select" required>
                            <select value={origin} onChange={handleChange('origin')}>
                                {originList.map(origin => (
                                    <option key={origin} value={origin} name="origin">{origin}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field is-centered auth__submit">
                    <div className="control">
                        <button type="submit" className="button is-link is-size-6 mr-6">{mode === 'edit' ? 'Edit' : 'Create'} Ingredient</button>
                        <button onClick={clear} className="button is-info is-size-6">Clear</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default IngredientForm;