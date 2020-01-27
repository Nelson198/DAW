const Post = require("../models/post")
const User = require("../models/user")
const Group = require("../models/group")
const moment = require("moment")
moment.locale("pt-pt")

module.exports.find = async () => {
    const aux = await Post.find({}).sort({ date: -1 }).exec()

    let posts = []
    for (const p of aux) {
        const post = p.toObject()
        post.date = moment(post.date).fromNow()
        posts.push(post)
    }

    return posts
}

module.exports.findOneById = async (id) => {
    const aux = await Post.findOne({ _id: id }).exec()
    const post = aux.toObject()
    post.date = moment(post.date).fromNow()

    return post
}

module.exports.findByEmail = async (email) => {
    const aux = await Post.find({ author: email }).sort({ date: -1 }).exec()

    let posts = []
    for (const p of aux) {
        const post = p.toObject()
        post.date = moment(post.date).fromNow()
        posts.push(post)
    }

    return posts
}

module.exports.findByGroup = async (id) => {
    const aux = await Post.find({ group: id }).sort({ date: -1 }).exec()

    let posts = []
    for (const p of aux) {
        const post = p.toObject()
        post.date = moment(post.date).fromNow()
        posts.push(post)
    }

    return posts
}

module.exports.insert = async post => {
    const newPost = new Post(post)
    await User.updateOne({ email: newPost.author }, { $push: { posts: newPost._id } }).exec()
    if (newPost.group !== null)
        await Group.updateOne({ _id: newPost.group }, { $push: { posts: newPost._id, files: newPost.attachments } }).exec()
    return newPost.save()
}

module.exports.remove = id => {
    return Post.deleteOne({ _id: id }).exec()
}

module.exports.backup = async (posts) => {
    await Post.deleteMany({})
    await Post.insertMany(posts)
}

module.exports.addComment = async (id, comment) => {
    await Post.updateOne({ _id: id }, { $push: { comments: comment } }).exec()
}

module.exports.updateOne = (id, updatedPost) => {
    return Post.updateOne({ _id: id }, { $set: updatedPost }).exec()
}
