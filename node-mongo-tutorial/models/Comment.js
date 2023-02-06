const mongoose = require("mongoose")

const schema = mongoose.Schema({
    comment: String,
})

module.exports = mongoose.model("Comment", schema)