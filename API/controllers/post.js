const Post = require("../models/post")
const User = require("../models/user")
const Group = require("../models/group")
const moment = require("moment")
moment.locale("pt-pt")

module.exports.find = async (condition) => {
    const aux = await Post.find(condition).sort({ date: -1 }).exec()

    let posts = []
    for (const p of aux) {
        const post = p.toObject()
        post.date = moment(post.date).fromNow()
        posts.push(post)
    }

    return posts
}

module.exports.findHashtags = () => {
    return Post.aggregate()
        .unwind("$hashtags")
        .group({
            _id: "$hashtags",
            count: {
                $sum: 1
            }
        })
        .sort({ "count": "desc" }).exec()
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
    const author = await User.findOneAndUpdate({ email: newPost.author }, { $push: { posts: newPost._id } }).exec()
    if (newPost.group !== null) {
        const group = await Group.findOneAndUpdate({ _id: newPost.group }, { $push: { posts: newPost._id, files: newPost.attachments } }).exec()

        const notification = {
            author: author.email,
            content: "Alguém fez uma nova publicação num grupo do qual fazes parte",
            link: `/groups/${newPost.group}`
        }
        for (const member of group.members) {
            if (member != author.email && !author.friends.includes(member))
                await User.updateOne({ email: member }, { $push: { notifications: notification } }).exec()
        }
    }

    const notification = {
        author: author.email,
        content: "Um amigo fez uma nova publicação",
        link: `/profiles/${author.email}`
    }
    for (const member of author.friends)
        await User.updateOne({ email: member }, { $push: { notifications: notification } }).exec()

    return newPost.save()
}

module.exports.remove = async (id) => {
    const post = await Post.findOneAndDelete({ _id: id }).exec()
    await User.updateOne({ email: post.author }, { $pull: { posts: post._id } })
    if (post.group)
        await Group.updateOne({ _id: post.group }, { $pull: { posts: post._id } })
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
