const {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getPosts,
    createBookmark,
    likeOrDislikePost,
    getFollowingPosts,
} = require("../controllers/postController")

const router = require("express").Router()
const authMiddleware = require("../middleware/authMiddleware")

//post
router.post("/create", authMiddleware, createPost)

//get
router.get("/following-posts", authMiddleware, getFollowingPosts)
router.get("/:id", authMiddleware, getPost)
router.get("/", authMiddleware, getPosts)
router.get("/like-dislike/:id", authMiddleware, likeOrDislikePost)
router.get("/:id/bookmark", authMiddleware, createBookmark)

//patch
router.patch("/update/:id", authMiddleware, updatePost)

//delete
router.delete("/delete/:id", authMiddleware, deletePost)


module.exports = router