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

let joinGroup = (email, groupId) => {
    axios.post(`http://localhost:7000/groups/${email}/joinGroup`, { _id: groupId })
        .then(res => {
            location.assign(`/groups/${groupId}`)
        })
        .catch(err => alert(err))
}

let leaveGroup = (email, groupId) => {
    axios.post(`http://localhost:7000/groups/${email}/leaveGroup`, { _id: groupId })
        .then(res => {
            location.assign(`/groups/${groupId}`)
        })
        .catch(err => alert(err))
}

let joinEvent = (email, eventId) => {
    axios.post(`http://localhost:7000/events/${eventId}/addParticipant`, { email: email })
        .then(res => {
            location.assign(`/events/${eventId}`)
        })
        .catch(err => alert(err))
}

let leaveEvent = (email, eventId) => {
    axios.post(`http://localhost:7000/events/${eventId}/removeParticipant`, { email: email })
        .then(res => {
            location.assign(`/events/${eventId}`)
        })
        .catch(err => alert(err))
}
