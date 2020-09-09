const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Recipe = require("../models/recipe");
const { errorHandler } = require("../helpers/dbErrorHandler");


exports.create = (req, res) => {
    // console.log("CREATE ORDER: ", req.body);
    req.body.recipe.user = req.profile;
    const recipe = new Order(req.body.recipe);
    recipe.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        res.json(data);
    });
};