const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { model } = require("mongoose")
const bcrypt = require("bcrypt")
const Message = require("../models/Contact")
const User = require("../models/User")
const Blog = require("../models/Blog")
const Comment = require("../models/Comment")
const Login = require("../models/Login")
const Admin = require("../models/Admin")
const AuthMiddleware = require("../middlewares/AuthMiddleware")
const PublicAuthMiddleware = require("../middlewares/authToken")
const MessageController = require("../controllers/messageController")
const UserController = require("../controllers/userController")
const BlogController = require("../controllers/blogController")
const CommentController = require("../controllers/commentController")
const AdminController = require("../controllers/adminController");
const AuthController = require("../controllers/authController");
const PublicController = require("../controllers/publicController");
const router = new express.Router()
dotenv.config();



router.get("/users/admin", AuthMiddleware.checkAuthenticationStatus, AdminController.getAdmin)
router.delete("/users/admin", AuthMiddleware.checkAuthenticationStatus, AdminController.deleteAdmin)
router.post("/users/admin", async (req, res) => {
    try {

        const hashedP = await bcrypt.hash(req.body.password, 10)
        const { email, names, password } = req.body;
        const addedDate = new Date();

        if (!email || !names || !password) {
            res.status(400).json({ msg: "Please add all required inputs", error: "" })
        }

        // if (Admin.length > 1)
        //     return res.status(400).json({ msg: "Not Allowed" })
        const _admin = new Admin({
            names,
            email,
            password: hashedP,
            created_on: addedDate,
        })
        await _admin.save()
        const token = jwt.sign({ id: Admin.id }, process.env.TOKEN_SECRET , {
            expiresIn: 60
        })
        return res.status(201).json({ msg: "Admin added successfully", data: _admin, token })
    } catch (error) {
        throw new Error(error)
    }

})


router.get("/messages", AuthMiddleware.checkAuthenticationStatus, MessageController.getMessages)
router.get("/messages/:id", AuthMiddleware.checkAuthenticationStatus, MessageController.getSingle)
router.delete("/messages/:id", AuthMiddleware.checkAuthenticationStatus, MessageController.deleteSingle)
router.post("/messages", async (req, res) => {
    try {

        const { email, message, name } = req.body;
        const addedDate = new Date();

        if (!email || !name || !message) {
            res.status(400).json({ msg: "Please add all required inputs", error: "" })
        }
        const _message = new Message({
            name,
            email,
            message,
            sent_On: addedDate,
        })
        await _message.save()
        return res.status(201).json({ msg: "Message sent successfully", data: _message })
    } catch (error) {
        throw new Error(error)
    }
})



router.post("/users/login/admin", AuthController.login);
router.post("/users/login", PublicController.PublicLogin);


// USERS


router.get("/users", AuthMiddleware.checkAuthenticationStatus, UserController.getUsers)
router.get("/users/:id", AuthMiddleware.checkAuthenticationStatus, UserController.getSingle)
router.delete("/users/:id", AuthMiddleware.checkAuthenticationStatus, UserController.deleteSingle)
router.patch("/users/:id", AuthMiddleware.checkAuthenticationStatus, UserController.updateSingle)
router.post("/users", async (req, res) => {
    try {

        const hashedP = await bcrypt.hash(req.body.password, 10)
        const { email, names, password } = req.body;
        const userP = password === req.body.password
        const addedDate = new Date();
        const doesExist = await  User.findOne({email});

        if (!email || !names || !password) {
            res.status(400).json({ msg: "Please add all required inputs", error: "" })
        } else if (doesExist) {
            res.status(400).json({ msg: "Email already exists", error: "" })
        } else {

            const _user = new User({
                names,
                email,
                password: hashedP,
                created_on: addedDate,
            })
            await _user.save()
            return res.status(201).json({ msg: "Signed Up successfully", data: _user })
        }
    } catch (error) {
        throw new Error(error)
    }
})



// POSTS


router.get("/blogs", BlogController.getBlogs)
router.get("/blogs/:id", BlogController.getSingle)
router.delete("/blogs/:id", AuthMiddleware.checkAuthenticationStatus, BlogController.deleteSingle)
router.patch("/blogs/:id", AuthMiddleware.checkAuthenticationStatus, BlogController.updateSingle)
router.post("/blogs", AuthMiddleware.checkAuthenticationStatus, async (req, res) => {
    try {
        const { title, subtitle, content, image } = req.body;
        const addedDate = new Date();

        if (!title || !subtitle || !content || !image) {
            res.status(400).json({ msg: "Please add all required inputs", error: "" })
        }
        const _blog = new Blog({
            title,
            image,
            subtitle,
            content,
            created_on: addedDate,
        })
        await _blog.save()
        return res.status(201).json({ msg: "Blog added successfully", data: _blog })
    } catch (error) {
        throw new Error(error)
    }
})


// COMMENTS


router.get("/comments", PublicAuthMiddleware.checkAuthentication, CommentController.getComments)
router.get("/comments/:id", PublicAuthMiddleware.checkAuthentication, CommentController.getSingle)
router.delete("/comments/:id", PublicAuthMiddleware.checkAuthentication, CommentController.deleteSingle)
router.post("/comments", PublicAuthMiddleware.checkAuthentication, async (req, res) => {
    try {
        const addedDate = new Date();
        const { comment } = req.body;

        if (!comment) {
            res.status(400).json({ msg: "Please add all required inputs", error: "" })
        }
        const _comment = new Comment({
            comment,
            created_on: addedDate,
        })
        await _comment.save()
        return res.status(201).json({ msg: "Comment added successfully", data: _comment })
    } catch (error) {
        throw new Error(error)
    }
})


module.exports = router;