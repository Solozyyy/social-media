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
        res.json({ data: newComment }).status(200)

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
        //res.json(commentId)
        const comment = await CommentModel.findById(commentId)
        //res.json(comment)
        const commentCreator = await UserModel.findById(comment?.creator?.creatorId)
        //res.json(req.user.id)
        //res.json(comment?.creator?.creatorId)
        if (commentCreator?._id.toString() !== req.user.id.toString()) {
            return next(new HttpError("You cannot delete this comment cuz you're not the creator of it", 433))
        }

        await PostModel.findByIdAndUpdate(comment?.postId, { $pull: { comments: commentId } })
        const deletedComment = await CommentModel.findByIdAndDelete(commentId)

        res.json({ success: true, deletedComment })
    } catch (error) {
        return next(new HttpError(error || "error occured"))
    }
}

module.exports = { createComment, getPostComments, deleteComment }