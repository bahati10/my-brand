const express = require("express")
const { model } = require("mongoose")
const Message = require("../models/Contact")
const User = require("../models/User")
const Post = require("../models/Post")
const MessageController = require("../controllers/messageController")
const UserController = require("../controllers/userController")
const router = new express.Router()



// router.post("/messages", async (req, res) => {
//     try {
//         const { email, message, name } = req.body;
//         if (!email || !name || !message) {
//             res.status(400).json({ msg: "Please add all required inputs", error: "" })
//         }
//         const _message = new Message({
//             name,
//             email,
//             message,
//         })
//         await _message.save()
//         return res.status(201).json({ msg: "Message sent successfully", data: _message })
//     } catch (error) {
//         throw new Error(error)
//     }
// })



// router.post("/messages", async (req, res) => {
//     try {

//         const { email, message, name } = req.body;

//         if (!email || !name || !message) {
//             res.status(400).json({ msg: "Please add all required inputs", error: "" })
//         }
//         const _message = new Message({
//             name,
//             email,
//             message,
//         })
//         await _message.save()
//         return res.status(201).json({ msg: "Message sent successfully", data: _message })
//     } catch (error) {
//         throw new Error(error)
//     }
// })

// router.post("/messages", MessageController.addMessage)
router.get("/messages", MessageController.getMessages)
router.get("/messages/:id", MessageController.getSingle)
router.delete("/messages/:id", MessageController.deleteSingle)
router.patch("/messages/:id", MessageController.updateSingle)



// USERS



router.post("/users", async (req, res) => {
    try {

        const { email, names, password } = req.body; const express = require("express")
        const { model } = require("mongoose")
        const User = require("../models/User")
        const router = new express.Router()


        router.post("/users", async (req, res) => {
            try {

                const { email, names, password } = req.body;

                if (!email || !names || !password) {
                    res.status(400).json({ msg: "Please add all required inputs", error: "" })
                }
                const _user = new User({
                    names,
                    email,
                    password,
                })
                await _user.save()
                return res.status(201).json({ msg: "User added succesfully successfully", data: _user })
            } catch (error) {
                throw new Error(error)
            }
        })
        if (!email || !names || !password) {
            return res.status(400).json({ msg: "Please add all required inputs", error: "" })
        }
        const _user = new User({
            names,
            email,
            password,
        })
        await _user.save()
        return res.status(201).json({ msg: "User added successfully", data: _user })
    } catch (error) {
        return res.status(400).json({ msg: "Something went wrong", error })
    }
})



router.get("/users", UserController.getUsers)
router.get("/users/:id", UserController.getSingle)
router.delete("/users/:id", UserController.deleteSingle)
router.patch("/users/:id", UserController.updateSingle)




// POSTS



router.post("/posts", async (req, res) => {
    try {

        const { title, subtitle, content } = req.body;
        const express = require("express")
        const { model } = require("mongoose")
        const Post = require("../models/Post")
        const router = new express.Router()


        router.post("/posts", async (req, res) => {
            try {

                const { title, subtitle, content } = req.body;

                if (!title || !subtitle || !content) {
                    res.status(400).json({ msg: "Please add all required inputs", error: "" })
                }
                const _post = new Post({
                    title,
                    subtitle,
                    content,
                })
                await _post.save()
                return res.status(201).json({ msg: "Post added sent successfully", data: _message })
            } catch (error) {
                throw new Error(error)
            }
        })
        if (!title || !subtitle || !content) {
            return res.status(400).json({ msg: "Please add all required inputs", error: "" })
        }
        const _post = new Post({
            title,
            subtitle,
            content,
        })
        await _post.save()
        return res.status(201).json({ msg: "User added successfully", data: _post })
    } catch (error) {
        return res.status(400).json({ msg: "Something went wrong", error })
    }
})






module.exports = router;