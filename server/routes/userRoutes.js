const {
    registerUser,
    loginUser,
    getUser,
    getUsers,
    changeUserAvatar,
    updateUser,
    followUnfollowUser
} = require("../controllers/userController")

const { getUserPost,
    getUserBookmark }
    = require("../controllers/postController")

const authMiddleware = require("../middleware/authMiddleware")
const router = require("express").Router()

//post
router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/avatar", authMiddleware, changeUserAvatar)

//get 
router.get("/bookmarks", authMiddleware, getUserBookmark)
router.get("/:id", authMiddleware, getUser)
router.get("/", authMiddleware, getUsers)
router.get("/:id/follow-unfollow", authMiddleware, followUnfollowUser)
router.get("/:id/posts", authMiddleware, getUserPost)


//patch
router.patch("/update", authMiddleware, updateUser)

module.exports = router