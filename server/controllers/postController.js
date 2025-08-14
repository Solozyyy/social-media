const HttpError = require("../models/errorModel")
const PostModel = require("../models/postModel")
const UserModel = require("../models/userModel")

const { v4: uuid } = require("uuid")
const cloudinary = require("../utils/cloudinary")
const fs = require("fs")
const path = require("path")

const createPost = async (req, res, next) => {
    try {
        res.json("Create post")
    } catch (error) {
        return next(new HttpError("Error occured"))
    }
}

const getPost = async (req, res, next) => {
    try {
        res.json("get post")
    } catch (error) {
        return next(new HttpError("Error occured"))
    }
}

const getPosts = async (req, res, next) => {
    try {
        res.json("get posts")
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
        res.json("update post")
    } catch (error) {
        return next(new HttpError("Error occured"))
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