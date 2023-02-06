const mongoose = require("mongoose")

const schema = mongoose.Schema({
    title: String,
    subtitle: String,
    content: String,
})

module.exports = mongoose.model("Blog", schema)