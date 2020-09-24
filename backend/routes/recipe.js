const express = require("express");
const router = express.Router();

const {
    create,
    listAll,
    listMatching,
    listMine,
    photo,
    read,
    recipeById,
    remove,
    update,
} = require("../controllers/recipe");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/recipe/:recipeId", read);
router.post("/recipe/create/:userId", requireSignin, isAuth, create);
router.put("/recipe/:recipeId/:userId", requireSignin, isAuth, update);
router.delete("/recipe/:recipeId/:userId", requireSignin, isAuth, remove);
router.get("/recipes/user/:userId", listMine);
router.get("/recipes", listAll);
router.get("/recipes/search", listMatching);
router.get("/recipe/photo/:recipeId", photo);

router.param("userId", userById);
router.param("recipeId", recipeById);

module.exports = router;
