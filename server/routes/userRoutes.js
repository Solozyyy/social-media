const {
    registerUser,
    loginUser,
    getUser,
    getUsers,
    changeUserAvatar,
    updateUser,
    followUnfollowUser
} = require("../controllers/userController")

const authMiddleware = require("../middleware/authMiddleware")
const router = require("express").Router()

router.post("/register", registerUser)
router.post("/login", loginUser)

//get users
router.get("/", getUsers, authMiddleware)

//get user
router.get("/:id", getUser, authMiddleware)

//follow/unfollow
router.get("/:id/follow-unfollow", authMiddleware, followUnfollowUser)

router.post("/avatar", authMiddleware, changeUserAvatar)
router.patch("/update", authMiddleware, updateUser)

module.exports = router