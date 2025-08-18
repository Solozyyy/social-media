const {
    createComment,
    getPostComments,
    deleteComment
} = require("../controllers/commentController")

const router = require("express").Router()
const authMiddleware = require("../middleware/authMiddleware")

//post
router.post("/:postId", authMiddleware, createComment)

//get
router.get("/:postId", authMiddleware, getPostComments)

//delete
router.delete("/:commentId", authMiddleware, deleteComment)

module.exports = router