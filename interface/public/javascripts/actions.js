let addFriend = (email, newFriend) => {
    axios.post(`http://localhost:7000/profiles/${email}/addFriend`, { email: newFriend })
        .then(res => {
            location.assign(`/profiles/${newFriend}`)
        })
        .catch(err => alert(err))
}

let removeFriend = (email, oldFriend) => {
    axios.post(`http://localhost:7000/profiles/${email}/removeFriend`, { email: oldFriend })
        .then(res => {
            location.assign(`/profiles/${oldFriend}`)
        })
        .catch(err => alert(err))
}
