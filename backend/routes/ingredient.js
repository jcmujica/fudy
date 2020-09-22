const express = require("express");
const router = express.Router();

const {
    create,
    ingredientById,
    read,
    update,
    remove,
    list,
    getOriginValues,
    photo
} = require("../controllers/ingredient");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/ingredient/:ingredientId", read);
router.get("/ingredient/origin-values/:userId", requireSignin, isAuth, getOriginValues);
router.post("/ingredient/create/:userId", requireSignin, isAuth, create); //isAdmin
router.put("/ingredient/:ingredientId/:userId", requireSignin, isAuth, isAdmin, update);
router.delete("/ingredient/:ingredientId/:userId", requireSignin, isAuth, isAdmin, remove);
router.get("/ingredients", list);
router.get("/ingredient/photo/:ingredientId", photo);

router.param("ingredientId", ingredientById);
router.param("userId", userById);

module.exports = router;
