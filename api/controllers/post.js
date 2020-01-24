const Post = require("../models/post")
const User = require("../models/user")

module.exports.find = () => {
    return Post.find({}).sort({ date: -1 }).exec()
}

module.exports.findOneById = id => {
    return Post.findOne({ _id: id }).exec()
}

module.exports.insert = async post => {
    const newPost = new Post(post)
    await User.updateOne({ email: newPost.author }, { $push: { posts: newPost._id } }).exec()
    return newPost.save()
}

module.exports.insertMany = posts => {
    return Post.insertMany(posts).exec()
}

module.exports.remove = id => {
    return Post.deleteOne({ _id: id }).exec()
}

module.exports.backup = async (posts) => {
    await Post.deleteMany({}).exec()
    await Post.insertMany(posts).exec()
}

module.exports.addComment = async (id, comment) => {
    await Post.updateOne({ _id: id }, { $push: { comments: comment } }).exec()
}

module.exports.updateOne = (id, updatedPost) => {
    return Post.updateOne({ _id: id }, { $set: updatedPost }).exec()
}
