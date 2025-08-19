const CommentModel = require("../models/commentModel")
const HttpError = require("../models/errorModel")
const PostModel = require("../models/postModel")
const UserModel = require("../models/userModel")

const createComment = async (req, res, next) => {
    try {
        const { postId } = req.params
        const { comment } = req.body
        if (!comment) {
            return next(new HttpError("Please write a comment", 422))
        }
        const commentCreator = await UserModel.findById(req.user.id)
        const newComment = await CommentModel.create({
            creator: {
                creatorId: req.user.id, creatorName: commentCreator?.fullName
                , creatorPhoto: commentCreator?.profilePhoto
            }
            , comment
            , postId
        })
        await PostModel.findByIdAndUpdate(postId, { $push: { comments: newComment?._id } }, { new: true })
        res.json(newComment).status(200)

    } catch (error) {
        return next(new HttpError(error || "error occured"))
    }
}

const getPostComments = async (req, res, next) => {
    try {
        const { postId } = req.params
        const comments = await PostModel.findById(postId).populate({ path: "comments", options: { sort: { createdAt: -1 } } })
        res.json(comments)
    } catch (error) {
        return next(new HttpError(error || "error occured"))
    }
}

const deleteComment = async (req, res, next) => {
    try {
        const { commentId } = req.params

        const deletedComment = await CommentModel.findByIdAndDelete(commentId)

        res.json(deletedComment)
    } catch (error) {
        return next(new HttpError(error || "error occured"))
    }
}

module.exports = { createComment, getPostComments, deleteComment }