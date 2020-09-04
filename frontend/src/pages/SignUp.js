import React, { useState } from 'react';
import * as auth from '../auth/index';
import { Redirect } from "react-router-dom";
import AuthLayout from '../layout/AuthLayout';
import images from '../assets/img/images';
import Modal from '../components/Modal';
import Loader from '../components/Loader';

function SignUp() {
    const [values, setValues] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const fields = [
        { type: 'email', name: 'email', placeholder: 'Email', required: true },
        { type: 'text', name: 'firstName', placeholder: 'First Name', required: true },
        { type: 'text', name: 'lastName', placeholder: 'Last Name', required: true },
        { type: 'password', name: 'password', placeholder: 'Password', required: true }
    ];

    const { email, password, firstName, lastName, loading, error, redirectToReferrer } = values;
    const { user } = auth.isAuthenticated();

    const signUp = (e) => {
        e.preventDefault();
        setValues({ ...values, error: false, loading: true });
        console.log({ email, password, firstName, lastName })
        auth.signup({ email, password, firstName, lastName }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                auth.authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (auth.isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };
    const showLoading = () =>
        loading && (
            <Loader />
        );

    const showError = () =>{
        const closeModal = () => {
            setValues({ ...values, error: false });
        };
        return (
        <Modal
            message={error}
            active={error ? true : false}
            close={closeModal}
        />)
    };
    return (
        <>
            <AuthLayout>
                <form onSubmit={(e) => signUp(e)}>
                    <div className="auth__logoContainer">
                        <figure className="image is-128x128">
                            <img className="is-square" src={images.logo} alt="logo" />
                        </figure>
                    </div>
                    {fields.map(field => (
                        <div key={field.name} className="field is-horizontal">
                            <label className="field-label has-text-white has-text-weight-bold auth__labels">{field.placeholder}</label>
                            <div className="control field-body">
                                <input
                                    className="input"
                                    name={field.name}
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
                            <button type="submit" className="button is-link is-size-4">Sign Up!</button>
                        </div>
                    </div>
                </form>
            </AuthLayout>
            {showLoading()}
            {showError()}
            {redirectUser()}
        </>
    )
}

export default SignUp
