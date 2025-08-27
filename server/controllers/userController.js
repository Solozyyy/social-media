const HttpError = require("../models/errorModel")
const UserModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const uuid = require("uuid").v4
const fs = require("fs")
const path = require("path")
const cloudinary = require("../utils/cloudinary")

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

        res.json({ success: true, user: newUser }).status(201)

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

        res.json({ token, id: user?._id, user }).status(201)
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

        const userToFollowId = req.params.id

        if (req.user.id === userToFollowId) {
            return next(new HttpError("Can't follow yourself", 422))
        }

        const currentUser = await UserModel.findById(req.user.id)

        //check if follow or not
        const isFollowing = currentUser?.following?.includes(userToFollowId)

        if (!isFollowing) {
            const updatedUser = await UserModel.findByIdAndUpdate(userToFollowId, { $push: { followers: req.user.id } }, { new: true })
            await UserModel.findByIdAndUpdate(req.user.id, { $push: { following: userToFollowId } }, { new: true })
            res.json(updatedUser).status(201)
        } else {
            const updatedUser = await UserModel.findByIdAndUpdate(userToFollowId, { $pull: { followers: req.user.id } }, { new: true })
            await UserModel.findByIdAndUpdate(req.user.id, { $pull: { following: userToFollowId } }, { new: true })
            res.json(updatedUser).status(201)
        }

    } catch (error) {
        return next(new HttpError(error))
    }
}

const changeUserAvatar = async (req, res, next) => {
    try {
        // res.json(req.files.avatar)

        if (!req.files.avatar) {
            return next(new HttpError("Please choose a file", 422))
        }

        const { avatar } = req.files
        if (avatar.size > 500000) {
            return next(new HttpError("Picture has size too big. Should be less than 500kB", 422))
        }

        let fileName = avatar.name
        let splittedFileName = fileName.split(".")
        let newFileName = splittedFileName[0] + uuid() + "." + splittedFileName[splittedFileName.length - 1]

        // res.json(newFileName)
        avatar.mv(path.join(__dirname, "..", "uploads", newFileName), async (err) => {
            if (err) {
                return next(new HttpError(err))
            }

            //store on cloud
            const result = await cloudinary.uploader.upload(path.join(__dirname, "..", "uploads", newFileName)
                , { resource_type: "image" })
            if (!result.secure_url) {
                return next(new HttpError("Couldn't upload image to cloudinary", 422))
            }
            const updatedUser = await UserModel.findByIdAndUpdate(req.user.id, { profilePhoto: result?.secure_url }, { new: true })
            res.json(updatedUser).status(200)
        })

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