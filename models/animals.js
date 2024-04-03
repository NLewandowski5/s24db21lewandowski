const mongoose = require("mongoose")
const animalSchema = mongoose.Schema({
    species: String,
    habitat: String,
    population: Number
});

module.exports = mongoose.model("Animal",
animalSchema)


