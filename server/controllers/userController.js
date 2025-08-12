const HttpError = require("../models/errorModel")
const UserModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const registerUser = async (req, res, next) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body

        if (!fullName || !email || !password || !confirmPassword) {
            return next(new HttpError("Fill in all blanks", 422))
        }

        const emailExisted = await UserModel.findOne({ email })
        if (emailExisted) {
            return next(new HttpError("Email is already existed", 422))
        }

        if (password !== confirmPassword) {
            return next(new HttpError("Password do not match", 422))
        }

        if (password.length < 6) {
            return next(new HttpError("Password should be at least has 6 characters", 422))
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await UserModel.create({ fullName, email, password: hashedPassword })

        res.json(newUser).status(201)

    } catch (error) {
        return next(new HttpError(error))
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return next(new HttpError("Fill in all fields", 422))
        }

        const user = await UserModel.findOne({ email })

        if (!user) {
            return next(new HttpError("user name is wrong", 422))
        }

        //check password
        if (!(await bcrypt.compare(password, user?.password))) {
            return next(new HttpError("password is wrong", 422))
        }

        const token = await jwt.sign({ id: user?._id }, process.env.JWT_SECRET, { expiresIn: "2h" })

        res.json({ token, id: user?._id }).status(201)
    } catch (error) {
        return next(new HttpError(error))
    }
}

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await UserModel.findById(id)

        if (!user) {
            return next(new HttpError("User doesn't exist", 422))
        }

        res.json(user).status(201)
    } catch (error) {
        return next(new HttpError(error))
    }
}

const getUsers = async (req, res, next) => {
    try {
        const userList = await UserModel.find()
        res.json(userList).status(201)
    } catch (error) {
        return next(new HttpError(error))
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { fullName, bio } = req.body

        const editCurrentUser = await UserModel.findByIdAndUpdate(req.user.id, { fullName, bio }, { new: true })

        res.json(editCurrentUser).status(201)

    } catch (error) {
        return next(new HttpError(error))
    }
}

const followUnfollowUser = async (req, res, next) => {
    try {
        const { id } = req.params
        res.json("Follow/Unfollow User")
    } catch (error) {
        return next(new HttpError(error))
    }
}

const changeUserAvatar = async (req, res, next) => {
    try {
        const { id } = req.params
        res.json("Get User")
    } catch (error) {
        return next(new HttpError(error))
    }
}

module.exports =
{
    registerUser,
    loginUser,
    getUser,
    getUsers,
    changeUserAvatar,
    updateUser,
    followUnfollowUser
}