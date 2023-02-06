const Message = require("../models/Contact")
class MessageService {
    static async getMessages() {
        try {
            const msgs = await Message.find();
            return msgs;

        } catch (error) {
            throw new Error(error)
        }
    }

    static async getSingleMessage(id) {
        try {
            const msg = await Message.findById(id);
            return msg;
        } catch (error) {
            throw new Error(error)
        }
    }

    static async deleteSingleMessage(_id) {
        try {
            const msg = await Message.deleteOne({
                _id
            })
            return msg;
        } catch (error) {
            throw new Error(error)
        }
    }

    static async updateSingleMessage(id) {
        try {
            const msg = await Message.findById(id)
            return msg;
        } catch (error) {
            throw new Error(error)
        }
    }

    // static async addSingleMessage() {
    //     try {

    //         const _message = new Message({
    //                 name,
    //                 email,
    //                 message,
    //         })
    //         return _message;
    //     } catch (error) {
    //         throw new Error(error)
    //     }
    // }
}


module.exports = MessageService;