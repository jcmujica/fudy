const { Recipe } = require("../models/recipe");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        // check for all fields
        const {
            name,
            instructions,
            ingredients,
            user
        } = fields;

        if (!name || !instructions || !ingredients || !user) {
            return res.status(400).json({
                error: "All fields are required"
            });
        } else {
            fields.name = name.toLowerCase();
        };

        fields.ingredients = JSON.parse(ingredients);

        let recipe = new Recipe(fields);

        if (files.photo) {
            console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            recipe.photo.data = fs.readFileSync(files.photo.path);
            recipe.photo.contentType = files.photo.type;
        }
        recipe.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.photo = (req, res, next) => {
    if (req.recipe.photo.data) {
        res.set("Content-Type", req.recipe.photo.contentType);
        return res.send(req.recipe.photo.data);
    }
    next();
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }

        const { ingredients } = fields;
        fields.ingredients = JSON.parse(ingredients);

        let recipe = req.recipe;
        recipe = _.extend(recipe, fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            recipe.photo.data = fs.readFileSync(files.photo.path);
            recipe.photo.contentType = files.photo.type;
        }

        recipe.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.recipeById = (req, res, next, id) => {
    Recipe.findById(id)
        .exec((err, recipe) => {
            if (err || !recipe) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            req.recipe = recipe;
            next();
        });
};

exports.remove = (req, res) => {
    const recipe = req.recipe;
    recipe.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Recipe deleted"
        });
    });
};

exports.read = (req, res) => {
    req.recipe.photo = undefined;
    return res.json(req.recipe);
};

exports.listAll = (req, res) => {
    Recipe.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.listMine = (req, res) => {
    Recipe.find({ user: { $eq: req.params.userId } })
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
};

exports.listMatching = (req, res) => {
    let searchIngredients = req.query.search;

    if (typeof searchIngredients === 'string') {
        searchIngredients = [searchIngredients];
    }

    console.log(searchIngredients)

    Recipe.find({ 'ingredients.name': { $in: searchIngredients } })
        .exec((err, recipe) => {
            if (err) {
                return res.status(400).json({
                    error: "Recipe not found"
                });
            }
            res.json(recipe);
        });
};
