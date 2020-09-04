import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

function NavBar(props) {
    const { history } = props;
    return (
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                    <p className="has-text-info is-size-2">Fudy</p>
                </Link>

                <span role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </span>
            </div>

            {/* <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item">Home</Link>
                </div>
            </div> */}

            <div className="navbar-end">
                {!isAuthenticated() ? (
                    <>
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link
                                    className="button is-primary"
                                    to="/signup"
                                >
                                    <strong>Sign up</strong>
                                </Link>
                                <Link
                                    className="button is-link"
                                    to="/signin"
                                >
                                    <strong>Sign in</strong>
                                </Link>
                            </div>
                        </div>
                    </>
                ) : (
                        <>
                            <div className="navbar-item">
                                <div className="buttons">
                                    <span
                                        className="button is-primary"
                                        style={{ cursor: "pointer", color: "#ffffff" }}
                                        onClick={() =>
                                            signout(() => {
                                                history.push("/");
                                            })
                                        }
                                    >
                                        <strong>Sign out</strong>
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
            </div>
        </nav >
    )
}

export default withRouter(NavBar);
