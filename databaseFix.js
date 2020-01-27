const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/ISN", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        const groups = await mongoose.connection.db.collection("groups").find().toArray()
        const users = await mongoose.connection.db.collection("users").find().toArray()
        const events = await mongoose.connection.db.collection("events").find().toArray()
        const posts = await mongoose.connection.db.collection("posts").find().toArray()

        for (const post of posts) {
            if (post.public) {
                // Public post
                const rand = Math.floor(Math.random() * (users.length - 1))
                await mongoose.connection.db.collection("posts").updateOne({ _id: post._id }, { $set: { author: users[rand].email } })
                await mongoose.connection.db.collection("users").updateOne({ email: users[rand].email }, { $addToSet: { posts: post._id.toString() } })
            } else {
                const binRand = Math.round(Math.random())
                if (binRand == 0) {
                    // Private post in a group
                    const randUser = Math.floor(Math.random() * (users.length - 1))
                    const randGroup = Math.floor(Math.random() * (groups.length - 1))
                    await mongoose.connection.db.collection("posts").updateOne({ _id: post._id }, { $set: { author: users[randUser].email, group: groups[randGroup]._id.toString() } })
                    await mongoose.connection.db.collection("users").updateOne({ email: users[randUser].email }, { $addToSet: { posts: post._id.toString() } })
                    await mongoose.connection.db.collection("groups").updateOne({ _id: groups[randGroup]._id }, { $addToSet: { posts: post._id.toString(), members: users[randUser].email } })
                } else {
                    // Private post
                    const rand = Math.floor(Math.random() * (users.length - 1))
                    await mongoose.connection.db.collection("posts").updateOne({ _id: post._id }, { $set: { author: users[rand].email } })
                    await mongoose.connection.db.collection("users").updateOne({ email: users[rand].email }, { $addToSet: { posts: post._id.toString() } })
                }
            }

            let comments = []
            let delta = 1000 * 60
            for (const comment of post.comments) {
                const rand = Math.floor(Math.random() * (users.length - 1))
                comment.author = users[rand].email
                delta += rand * 60 * 1000
                comment.date.setTime(post.date.getTime() + delta)
                comments.push(comment)
            }
            await mongoose.connection.db.collection("posts").updateOne({ _id: post._id }, { $set: { comments: comments } })
        }

        for (const group of groups) {
            const rand = Math.floor(Math.random() * (users.length - 6))
            const usersM = users.slice(rand, rand + 5).map(u => { return u.email })
            await mongoose.connection.db.collection("groups").updateOne({ _id: group._id }, { $addToSet: { members: { $each: usersM } } })
            for (const mail of usersM)
                await mongoose.connection.db.collection("users").updateOne({ email: mail }, { $addToSet: { groups: group._id.toString() } })
        }

        for (const user of users) {
            const rand = Math.floor(Math.random() * (users.length - 6))
            const usersM = users.slice(rand, rand + 5).map(u => { return u.email })
            await mongoose.connection.db.collection("users").updateOne({ email: user.email }, { $addToSet: { friends: { $each: usersM } } })
            for (const mail of usersM)
                await mongoose.connection.db.collection("users").updateOne({ email: mail }, { $addToSet: { friends: user.email } })
        }

        for (const event of events) {
            const rand = Math.floor(Math.random() * (users.length - 6))
            const usersM = users.slice(rand, rand + 5).map(u => { return u.email })
            await mongoose.connection.db.collection("events").updateOne({ _id: event._id }, { $addToSet: { participants: { $each: usersM } } })
            for (const mail of usersM)
                await mongoose.connection.db.collection("users").updateOne({ email: mail }, { $addToSet: { events: event._id.toString() } })
        }

        console.log("Done")
    })
    .catch((erro) => console.log("Erro na conexão: " + erro))
