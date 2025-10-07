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
                await UserModel.findByIdAndUpdate(newPost?.creator, { $push: { posts: newPost?._id } })
                res.json(newPost).status(201)
            })
        }

    } catch (error) {
        return next(new HttpError(error || "Error occured"))
    }
}

const getPost = async (req, res, next) => {
    try {
        const { id } = req.params
        const post = await PostModel.findById(id).populate("creator").populate({ path: "comments", options: { sort: { createdAt: -1 } } })

        if (!post) {
            return next(new HttpError("post doesn't exist", 404))
        }

        res.json({ data: post }).status(200)

    } catch (error) {
        return next(new HttpError(error.message || "Error occured"))
    }
}

const getPosts = async (req, res, next) => {
    try {
        const posts = await PostModel.find().sort({ createdAt: -1 })
        res.json({ data: posts }).status(200)
    } catch (error) {
        return next(new HttpError("Error occured"))
    }
}

const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id

        const currentPost = await PostModel.findById(postId)
        //res.json(currentPost?.creator)
        //res.json(req.user.id.toString())
        if (currentPost?.creator.toString() !== req.user.id.toString()) {
            return next(new HttpError("You cannot delete this post cuz you are not the creator", 433))
        }
        const deletedPost = await PostModel.findByIdAndDelete(postId)
        await UserModel.findByIdAndUpdate(currentPost?.creator, { $pull: { posts: currentPost?._id } })

        res.json(deletedPost)
    } catch (error) {
        return next(new HttpError(error || "Error occured"))
    }
}

const updatePost = async (req, res, next) => {
    try {
        const postId = req.params.id

        const { body } = req.body

        const post = await PostModel.findById(postId)
        //res.json(post?.creator)
        //res.json(req.user.id)
        if (post?.creator.toString() !== req.user.id.toString()) {
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
        const user = await UserModel.findById(req.user.id)
        const posts = await PostModel.find({ creator: { $in: user?.following } })
        res.json(posts)
    } catch (error) {
        return next(new HttpError("Error occured"))
    }
}

const likeOrDislikePost = async (req, res, next) => {
    try {
        const postId = req.params.id
        let updatedPost
        const post = await PostModel.findById(postId)
        if (post?.likes.includes(req.user.id)) {
            updatedPost = await PostModel.findByIdAndUpdate(postId, { $pull: { likes: req.user.id } }, { new: true })
        }
        else {
            updatedPost = await PostModel.findByIdAndUpdate(postId, { $push: { likes: req.user.id } }, { new: true })
        }
        res.json({ data: updatedPost })

    } catch (error) {
        return next(new HttpError(error || "Error occured"))
    }
}

const getUserPost = async (req, res, next) => {
    try {
        const userId = req.params.id
        const posts = await UserModel.findById(userId).populate({ path: "posts", options: { sort: { createdAt: -1 } } })
        res.json({ data: posts })
    } catch (error) {
        return next(new HttpError("Error occured"))
    }
}

const createBookmark = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user.id)

        const postId = req.params.id

        let updatedUser

        if (user?.bookmarks.includes(postId)) {
            updatedUser = await UserModel.findByIdAndUpdate(req.user.id, { $pull: { bookmarks: postId } }, { new: true })
        }
        else {
            updatedUser = await UserModel.findByIdAndUpdate(req.user.id, { $push: { bookmarks: postId } }, { new: true })
        }
        res.json({ data: updatedUser })
    } catch (error) {
        return next(new HttpError("Error occured"))
    }
}

const getUserBookmark = async (req, res, next) => {
    try {
        const userBookmarks = await UserModel.findById(req.user.id).populate({ path: "bookmarks", options: { sort: { createdAt: -1 } } })
        res.json({ data: userBookmarks })
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