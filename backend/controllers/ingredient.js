const Ingredient = require("../models/ingredient");
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
        const {
            name,
        } = fields;

        if (!name) {
            return res.status(400).json({
                error: "All fields are required"
            });
        } else {
            fields.name = name.toLowerCase();
        };

        let ingredient = new Ingredient(fields);

        if (files.photo) {
            console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            ingredient.photo.data = fs.readFileSync(files.photo.path);
            ingredient.photo.contentType = files.photo.type;
        }

        ingredient.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.read = (req, res) => {
    return res.json(req.ingredient);
};

exports.photo = (req, res, next) => {
    if (req.ingredient.photo.data) {
        res.set("Content-Type", req.ingredient.photo.contentType);
        return res.send(req.ingredient.photo.data);
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

        let ingredient = req.ingredient;
        ingredient = _.extend(ingredient, fields);

        if (files.photo) {
            console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            ingredient.photo.data = fs.readFileSync(files.photo.path);
            ingredient.photo.contentType = files.photo.type;
        }

        ingredient.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.ingredientById = (req, res, next, id) => {
    Ingredient.findById(id)
        .exec((err, ingredient) => {
            if (err || !ingredient) {
                return res.status(400).json({
                    error: "Ingredient does not exist"
                });
            }
            req.ingredient = ingredient;
            next();
        });
};

exports.remove = (req, res) => {
    const ingredient = req.ingredient;
    ingredient.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Ingredient deleted"
        });
    });
};

exports.list = (req, res) => {
    Ingredient.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.getOriginValues = (req, res) => {
    res.json(Ingredient.schema.path("origin").enumValues);
};
