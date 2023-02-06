const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes/index")
const app = express();
const dotenv = require("dotenv");

dotenv.config();
const port =  process.env.PORT || 3000;

app.use(express.json())
app.use("/api", routes)
     
app.listen(port, () => {
    console.log("Server is listening on port", port)
})


mongoose.set('strictQuery', false)
    .connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => {
        console.log("connected to DB")
    }).catch((err) => console.log("Error, couldn't connect to db", err))
app.get("/", (req, res) => {
    res.status(200).json({msg:"Welcome home"})
})