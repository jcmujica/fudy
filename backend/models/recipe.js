const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const IngredientListSchema = new mongoose.Schema(
    {
        ingredient: { type: Schema.ObjectId, ref: "Ingredient" },
        name: String,
        amount: Number,
        unit: String
    },
    { timestamps: true }
);

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
        ingredients: [IngredientListSchema]
    },
    { timestamps: true }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = { Recipe, IngredientList };

