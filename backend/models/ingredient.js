const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema(
    {
        name: {
            maxlength: 32,
            required: true,
            trim: true,
            type: String,
        },
        origin: {
            default: "Other",
            enum: ["Animal", "Vegetable", "Other"],
            required: true,
            type: String,
        },
        photo: {
            data: Buffer,
            contentType: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Ingredient", ingredientSchema);