const {
    createMessage,
    getMessages,
    getConversations
} = require("../controllers/messageController")

const router = require("express").Router()
const authMiddleware = require("../middleware/authMiddleware")

//post
router.post("/:receiverId", authMiddleware, createMessage)

//get
router.get("/conversations", authMiddleware, getConversations)
router.get("/:receiverId", authMiddleware, getMessages)

module.exports = router