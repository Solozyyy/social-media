const { Schema, model } = require("mongoose")

const postSchema = new Schema({
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    body: { type: String, required: true },
    image: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "User" }]
})


module.exports = model("Post", postSchema)
