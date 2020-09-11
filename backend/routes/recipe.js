const express = require("express");
const router = express.Router();

const {
    create,
    recipeById,
    read,
    update,
    remove,
    listAll,
    listMine,
    getOriginValues
} = require("../controllers/recipe");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/recipe/:recipeId", read);
// router.get("/recipe", getAll);
// router.get("/recipe/origin-values/:userId", requireSignin, isAuth, getOriginValues);
router.post("/recipe/create/:userId", requireSignin, isAuth, create); //isAdmin
router.put("/recipe/:recipeId/:userId", requireSignin, isAuth, update);
// router.delete(
//     "/recipe/:recipeId/:userId",
//     requireSignin,
//     isAuth,
//     isAdmin,
//     remove
// );
router.get("/recipes/user/:userId", listMine);
router.get("/recipes", listAll);

router.param("userId", userById);
router.param("recipeId", recipeById);

module.exports = router;
