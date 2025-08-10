const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    profilePhoto:
    {
        type: String,
        default: "https://res.cloudinary.com/dnsaxhagw/image/upload/v1754793224/%E1%BA%A2nh_ch%E1%BB%A5p_m%C3%A0n_h%C3%ACnh_2025-08-10_092312_ethbex.png"
    },
    bio:
    {
        type: String,
        default: "No bio yet",
    },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
}, { timestamps: true })

module.exports = mongoose.model("userSchema", userSchema)