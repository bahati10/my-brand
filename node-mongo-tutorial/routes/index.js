const express = require("express")
const { model } = require("mongoose")
const Message = require("../models/Contact")
const User = require("../models/User")
const Blog = require("../models/Blog")
const Comment = require("../models/Comment")
const MessageController = require("../controllers/messageController")
const UserController = require("../controllers/userController")
const BlogController = require("../controllers/blogController")
const CommentController = require("../controllers/commentController")
const router = new express.Router()



router.get("/messages", MessageController.getMessages)
router.get("/messages/:id", MessageController.getSingle)
router.delete("/messages/:id", MessageController.deleteSingle)
router.patch("/messages/:id", MessageController.updateSingle)




router.post("/messages", async (req, res) => {
    try {

        const { email, message, name } = req.body;

        if (!email || !name || !message) {
            res.status(400).json({ msg: "Please add all required inputs", error: "" })
        }
        const _message = new Message({
            name,
            email,
            message,
        })
        await _message.save()
        return res.status(201).json({ msg: "Message sent successfully", data: _message })
    } catch (error) {
        throw new Error(error)
    }
})




// USERS


router.get("/users", UserController.getUsers)
router.get("/users/:id", UserController.getSingle)
router.delete("/users/:id", UserController.deleteSingle)
router.patch("/users/:id", UserController.updateSingle)



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



// POSTS


router.get("/blogs", BlogController.getBlogs)
router.get("/blogs/:id", BlogController.getSingle)
router.delete("/blogs/:id", BlogController.deleteSingle)
router.patch("/blogs/:id", BlogController.updateSingle)




router.post("/blogs", async (req, res) => {
    try {

        const { title, subtitle, content } = req.body;

        if (!title || !subtitle || !content) {
            res.status(400).json({ msg: "Please add all required inputs", error: "" })
        }
        const _blog = new Blog({
            title,
            subtitle,
            content,
        })
        await _blog.save()
        return res.status(201).json({ msg: "Blog added successfully", data: _blog })
    } catch (error) {
        throw new Error(error)
    }
})

// COMMENTS


router.get("/comments", CommentController.getComments)
router.get("/comments/:id", CommentController.getSingle)
router.delete("/comments/:id",     CommentController.deleteSingle)

router.post("/comments", async (req, res) => {
    try {

        const { comment } = req.body;

        if (!comment) {
            res.status(400).json({ msg: "Please add all required inputs", error: "" })
        }
        const _comment = new Comment({
            comment,
        })
        await _comment.save()
        return res.status(201).json({ msg: "Comment added successfully", data: _comment })
    } catch (error) {
        throw new Error(error)
    }
})


module.exports = router;