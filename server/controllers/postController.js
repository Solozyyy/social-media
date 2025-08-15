const HttpError = require("../models/errorModel")
const PostModel = require("../models/postModel")
const UserModel = require("../models/userModel")

const { v4: uuid } = require("uuid")
const cloudinary = require("../utils/cloudinary")
const fs = require("fs")
const path = require("path")

const createPost = async (req, res, next) => {
    try {
        //res.json(req.files)
        const { body } = req.body
        if (!body) {
            return next(new HttpError("Please fill in text field", 422))
        }

        const { image } = req.files
        if (!image) {
            next()
        } else {
            if (image.size > 1000000) {
                return next(new HttpError("Picture is too big, must be less than 1Mb", 422))
            }
            let fileName = image.name
            fileName = fileName.split(".")
            fileName = fileName[0] + uuid() + "." + fileName[fileName.length - 1]
            await image.mv(path.join(__dirname, "..", "uploads", fileName), async (err) => {
                if (err) {
                    return next(new HttpError(err))
                }
                const result = await cloudinary.uploader.upload(path.join(__dirname, "..", "uploads", fileName),
                    { resource_type: "image" })
                if (!result.secure_url) {
                    return next(new HttpError("couldn't upload to cloudinary"))
                }
                const newPost = await PostModel.create({ creator: req.user.id, body, image: result.secure_url })
                await UserModel.findByIdAndUpdate(newPost?.creator, { $push: newPost?._id })
                res.json(newPost)
            })
        }

    } catch (error) {
        return next(new HttpError("Error occured"))
    }
}

const getPost = async (req, res, next) => {
    try {
        const { id } = req.params
        const post = await PostModel.findById(id).populate("creator").populate({ path: "comments", options: { sort: { createdAt: -1 } } })

        if (!post) {
            return next(new HttpError("post doesn't exist", 404))
        }

        res.json(post).status(200)

    } catch (error) {
        return next(new HttpError(error.message || "Error occured"))
    }
}

const getPosts = async (req, res, next) => {
    try {
        const posts = await PostModel.find().sort({ createdAt: -1 })
        res.json(posts)
    } catch (error) {
        return next(new HttpError("Error occured"))
    }
}

const deletePost = async (req, res, next) => {
    try {
        res.json("delete post")
    } catch (error) {
        return next(new HttpError("Error occured"))
    }
}

const updatePost = async (req, res, next) => {
    try {
        const postId = req.params.id

        const { body } = req.body

        const post = await PostModel.findById(postId)
        res.json(post?.creator)
        //res.json(req.user.id)
        if (post?.creator !== req.user.id) {
            return next(new HttpError("You can't update this post since you are not the creator", 403))
        }
        const updatedPost = await PostModel.findByIdAndUpdate(postId, { body }, { new: true })

        res.json(updatedPost)
    } catch (error) {
        return next(new HttpError(error || "Error occured"))
    }
}

const getFollowingPosts = async (req, res, next) => {
    try {
        res.json("get following post")
    } catch (error) {
        return next(new HttpError("Error occured"))
    }
}

const likeOrDislikePost = async (req, res, next) => {
    try {
        res.json("Like/dislike post")
    } catch (error) {
        return next(new HttpError("Error occured"))
    }
}

const getUserPost = async (req, res, next) => {
    try {
        res.json("Get user post")
    } catch (error) {
        return next(new HttpError("Error occured"))
    }
}

const createBookmark = async (req, res, next) => {
    try {
        res.json("Create bookmark")
    } catch (error) {
        return next(new HttpError("Error occured"))
    }
}

const getUserBookmark = async (req, res, next) => {
    try {
        res.json("Get user bookmark")
    } catch (error) {
        return next(new HttpError("Error occured"))
    }
}

module.exports =
{
    createPost,
    updatePost,
    deletePost,
    getPost,
    getPosts,
    getUserPost,
    getUserBookmark,
    createBookmark,
    likeOrDislikePost,
    getFollowingPosts
}