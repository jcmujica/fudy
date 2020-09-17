import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signin from "./pages/SignIn";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './pages/Dashboard';
import AdminRoute from './auth/AdminRoute';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={SignUp} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <AdminRoute path="/admin/dashboard" exact component={Dashboard} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
