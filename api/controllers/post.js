var Post = require("../models/post")

module.exports.find = () => {
    return Post.find().exec()
}

module.exports.findOneById = id => {
    return Post.findOne({ _id: id }).exec()
}

module.exports.insert = post => {
    var newPost = new Post(post)
    return newPost.save()
}

module.exports.insertMany = posts => {
    return Post.insertMany(posts).exec()
}

module.exports.backup = async (posts) => {
    await Post.deleteMany({}).exec()
    await Post.insertMany(posts).exec()
}
