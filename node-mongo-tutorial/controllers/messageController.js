const MessageService = require("../services/messageService")

class MessageController {
    static async getMessages(req, res) {
        try {
            const messages = await MessageService.getMessages();
            return res.status(200).json({ msg: "Messages retrieved", data: messages })
        } catch (error) {
            return res.status(400).json({ msg: "Something went wrong", error })
        }
    }

    static async getSingle(req, res) {
        try {
            const { id } = req.params;
            const message = await MessageService.getSingleMessage(id);
            if (!message) {
                return res.status(404).json({ msg: "Message not found", error: "" })
            }
            return res.status(200).json({ msg: "Messages retrieved", data: message })
        } catch (error) {
            return res.status(400).json({ msg: "Something went wrong", error })
        }
    }

    static async deleteSingle(req, res) {
        try {
            const { id } = req.params;
            const m = await MessageService.deleteSingleMessage(id);
            return res.status(200).json({ msg: "Messsage deleted successfully" })

        } catch (error) {
            return res.status(400).json({ msg: "Something went wrong", error })

        }
    }

    static async updateSingle(req, res) {
        try {
            const { id } = req.params;
            const msg = await MessageService.updateSingleMessage(id)
            if (req.body.name) {
                msg.name = req.body.name
            }

            if (req.body.email) {
                msg.email = req.body.email
            }

            if (req.body.message) {
                msg.message = req.body.message
            }

            await msg.save()
            res.send(msg)
        } catch (error) {
            return res.status(400).json({ msg: "Something went wrong", error })
        }
    }

}



module.exports = MessageController;

