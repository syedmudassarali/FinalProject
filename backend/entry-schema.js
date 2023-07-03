const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
    recipe: String,
    preptime: Number,
    cooktime: Number,
    cuisine: String,
    course: String,
    diet: String,
    ingredients: String
});

module.exports = mongoose.model('DiaryEntry', entrySchema);