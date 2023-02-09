const mongoose = require("mongoose")

const schema = mongoose.Schema({
    comment: String,
    created_on: String,
})

module.exports = mongoose.model("Comment", schema)