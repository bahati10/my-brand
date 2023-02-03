const express = require("express")
const { model } = require("mongoose")
const Message = require("./models/Contact") // new
const router = new express.Router()


router.post("/messages", async (req, res) => {
    try {

        const { email, message, name } = req.body; const express = require("express")
        const { model } = require("mongoose")
        const Message = require("./models/Contact") // new
        const router = new express.Router()


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
                //    return  res.status(400).json({msg: "Something went wrong", error})
                throw new Error(error)
            }
        })
        if (!email || !name || !message) {
            return res.status(400).json({ msg: "Please add all required inputs", error: "" })
        }
        const _message = new Message({
            name,
            email,
            message,
        })
        await _message.save()
        return res.status(201).json({ msg: "Message sent successfully", data: _message })
    } catch (error) {
        return res.status(400).json({ msg: "Something went wrong", error })
    }
})


router.get("/messages", async (req, res) => {

    try {
        const msgs = await Message.find();
        return res.status(200).json({ msg: "Messages retried", data: msgs })

    } catch (error) {
        return res.status(400).json({ msg: "Something went wrong", error })
    }
})

router.get("/messages/:id", async (req, res) => {

    try {

        const { id } = req.params;
        const msg = await Message.findById(id);
        if (!msg) {
            return res.status(404).json({ msg: "Message not found", error: "" })
        }
        return res.status(200).json({ msg: "Messages retried", data: msg })

    } catch (error) {
        return res.status(400).json({ msg: "Something went wrong", error })
    }
})

router.patch("/messages/:id", async (req, res) => {
	try {
		const message = await Message.findById(req.params.id)

		if (req.body.name) {
			message.name = req.body.name
		}

		if (req.body.email) {
			message.email = req.body.email
		}
        if (req.body.message) {
			message.message = req.body.message
		}

		await message.save()
		res.send(message)
	} catch(err) {

        // throw new Error(err)

		res.status(404)
		res.send({ error: "Message doesn't exist!" })
	}
})



router.delete("/messages/:id", async (req, res) => {
	try {
		await Message.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Message doesn't exist!" })
	}
})

module.exports = router;