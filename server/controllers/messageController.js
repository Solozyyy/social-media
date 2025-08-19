const MessageModel = require("../models/messageModel")
const UserModel = require("../models/userModel")
const ConversationModel = require("../models/conversationModel")
const HttpError = require("../models/errorModel")

const createMessage = async (req, res, next) => {
    try {

        res.json("create message")

    } catch (error) {
        return next(new HttpError(error || "error occured"))
    }
}

const getMessages = async (req, res, next) => {
    try {

        res.json("get messages")

    } catch (error) {
        return next(new HttpError(error || "error occured"))
    }
}

const getConversations = async (req, res, next) => {
    try {

        res.json("get conversations")

    } catch (error) {
        return next(new HttpError(error || "error occured"))
    }
}

module.exports = { createMessage, getMessages, getConversations }