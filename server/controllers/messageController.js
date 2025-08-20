const MessageModel = require("../models/messageModel")
const UserModel = require("../models/userModel")
const ConversationModel = require("../models/conversationModel")
const HttpError = require("../models/errorModel")

const createMessage = async (req, res, next) => {
    try {
        const { receiverId } = req.params
        const { messageBody } = req.body

        let conversation = await ConversationModel.findOne({ participants: { $all: [req.user.id, receiverId] } })
        //create a new conversation if it hasn't been created yet
        if (!conversation) {
            conversation = await ConversationModel.create({ participants: [req.user.id, receiverId], lastMessage: { text: messageBody, senderId: req.user.id } })
        }
        const newMessage = await MessageModel.create({ conversationId: conversation._id, senderId: req.user.id, text: messageBody })
        //update last message in conversation
        await conversation.updateOne({ lastMessage: { text: messageBody, senderId: req.user.id } })

        res.json(newMessage)
    } catch (error) {
        return next(new HttpError(error || "error occured"))
    }
}

const getMessages = async (req, res, next) => {
    try {

        const { receiverId } = req.params
        const conversation = await ConversationModel.findOne({ participants: { $all: [req.user.id, receiverId] } })

        if (!conversation) {
            return next(new HttpError("No messages with this user"))
        }
        const messages = await MessageModel.find({ conversationId: conversation._id }).sort({ createdAt: 1 })
        res.json(messages)

    } catch (error) {
        return next(new HttpError(error || "error occured"))
    }
}

const getConversations = async (req, res, next) => {
    try {

        const conversations = await ConversationModel.find({ participants: req.user.id }).populate({
            path: "participants", select: "fullName profilePhoto"
        }).sort({ createdAt: -1 })

        //remove current user from list
        conversations.forEach((conversation) => {
            conversation.participants = conversation.participants.filter(
                (participants) => participants._id.toString() !== req.user.id.toString()
            )
        });

        if (!conversations) {
            return next(new HttpError("User has no conversations"))
        }
        res.json(conversations)

    } catch (error) {
        return next(new HttpError(error || "error occured"))
    }
}

module.exports = { createMessage, getMessages, getConversations }