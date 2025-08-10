const HttpError = require("../models/errorModel")

const registerUser = async (req, res, next) => {
    try {
        res.json("Register User")
    } catch (error) {
        return next(new HttpError(error))
    }
}

const loginUser = async (req, res, next) => {
    try {
        res.json("Login User")
    } catch (error) {
        return next(new HttpError(error))
    }
}

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params
        res.json("Get User")
    } catch (error) {
        return next(new HttpError(error))
    }
}

const getUsers = async (req, res, next) => {
    try {
        res.json("Get Users")
    } catch (error) {
        return next(new HttpError(error))
    }
}

const updateUser = async (req, res, next) => {
    try {
        res.json("Update User")
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