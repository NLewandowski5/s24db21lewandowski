const mongoose = require("mongoose")
const animalSchema = mongoose.Schema({
    species: {
        type: String,
        minlength: 3,
        maxlength: 50
    },

    habitat: {
        type: String,
        minlength: 3,
        maxlength: 50
    },

    population: {
        type: Number,
        Min: 0,
        Max: 1000000
    }
});

module.exports = mongoose.model("Animal",
animalSchema)


