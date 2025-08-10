const {
    registerUser,
    loginUser,
    getUser,
    getUsers,
    changeUserAvatar,
    updateUser,
    followUnfollowUser
} = require("../controllers/userController")

const router = require("express").Router()

router.post("/register", registerUser)
router.post("/login", loginUser)

//get user
router.get("/:id", getUser)

//get users
router.get("/users", getUsers)

//follow/unfollow
router.get("/:id/follow-unfollow", followUnfollowUser)

router.post("/avatar", changeUserAvatar)
router.patch("/update/:id", updateUser)

module.exports = router