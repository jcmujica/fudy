const express = require("express");
const router = express.Router();

const {
    create,
    recipeById,
    read,
    update,
    remove,
    list,
    getOriginValues
} = require("../controllers/recipe");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

// router.get("/recipe/:recipeId", read);
// router.get("/recipe/origin-values/:userId", requireSignin, isAuth, getOriginValues);
router.post("/recipe/create/:userId", requireSignin, isAuth, create); //isAdmin
// router.put("/recipe/:recipeId/:userId", requireSignin, isAuth, isAdmin, update);
// router.delete(
//     "/recipe/:recipeId/:userId",
//     requireSignin,
//     isAuth,
//     isAdmin,
//     remove
// );
// router.get("/recipes", list);

// router.param("recipeId", recipeById);
router.param("userId", userById);

module.exports = router;
