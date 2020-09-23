const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const IngredientListSchema = new mongoose.Schema(
    {
        ingredient: { type: ObjectId, ref: "Ingredient" },
        name: { type: String },
        amount: { type: Number },
        unit: { type: String }
    });

const IngredientList = mongoose.model("IngredientList", IngredientListSchema);

const RecipeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 64
        },
        instructions: {
            type: String,
            trim: true,
            required: true,
            maxlength: 10000
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        ingredients: [IngredientListSchema],
        user: { type: ObjectId, ref: "User" }
    },
    { timestamps: true }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = { Recipe, IngredientList };

