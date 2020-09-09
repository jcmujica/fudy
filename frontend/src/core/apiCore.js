import { API } from "../config";
// import queryString from "query-string";

export const getIngredients = () => {
    return fetch(`${API}/ingredients`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createIngredients = (userId, token, ingredientData) => {
    return fetch(`${API}/ingredient/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: ingredientData
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const createRecipes = (userId, token, recipeData) => {
    return fetch(`${API}/recipe/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: recipeData
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const updateIngredient = (ingredientId, userId, token, ingredientData) => {
    return fetch(`${API}/ingredient/${ingredientId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: ingredientData
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteIngredient = (ingredientId, userId, token) => {
    return fetch(`${API}/ingredient/${ingredientId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getOriginValues = (userId, token) => {
    return fetch(`${API}/ingredient/origin-values/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
