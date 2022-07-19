const mongoose  = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
        quantity: {
        type: Number,
        required: true
    },
    distance: {
        type: Number,
        required: true
    }
})

module.exports = {
    Products: mongoose.model("products", ProductSchema)
}