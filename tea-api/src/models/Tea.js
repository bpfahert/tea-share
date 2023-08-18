const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = require("./User");

const opts = { toJSON: { virtuals: true } };

const TeaSchema = new Schema({
    tea_name: {type: String, required: [true, "Please enter a tea name"], minLength: 2, maxLength: 35, unique: [true, 'There is already a tea with this name']},
    brand: {type: String, maxLength: 30},
    rating: {type: Number},
    average_rating: {type: Number},
    notes: {type: String, maxLength: 400},
    created_by: {type: Schema.Types.ObjectId, ref: "User"},
    created_on: {type: Date},
    updated_on: {type: Date},
    img: {data: Buffer, contentType: String},
    type: {type: String},
});

TeaSchema.virtual("url").get(function () {
    return `/teas/${this.id}`;
});

module.exports = mongoose.model("Tea", TeaSchema);