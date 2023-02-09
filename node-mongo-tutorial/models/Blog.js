const mongoose = require("mongoose")

const schema = mongoose.Schema({
    title: String,
    image: String,
    subtitle: String,
    content: String,
    created_on: String,
})

module.exports = mongoose.model("Blog", schema)

