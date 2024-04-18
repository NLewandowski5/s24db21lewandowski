const mongoose = require("mongoose")
const animalSchema = mongoose.Schema({
    species: {
        type: String,
    },

    habitat: {
        type: String,
    },

    population: {
        type: Number,
        Min: 0,
        Max: 1000000
    }
});

module.exports = mongoose.model("Animal",
animalSchema)


