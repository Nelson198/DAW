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

let acceptFriend = (email, friend) => {
    axios.post(`http://localhost:7000/profiles/${email}/acceptFriend`, { email: friend })
        .then(res => {
            location.assign(`/friendRequests`)
        })
        .catch(err => alert(err))
}

let rejectFriend = (email, friend) => {
    axios.post(`http://localhost:7000/profiles/${email}/rejectFriend`, { email: friend })
        .then(res => {
            location.assign(`/friendRequests`)
        })
        .catch(err => alert(err))
}

let removeNotification = (email, notificationId) => {
    axios.post(`http://localhost:7000/profiles/${email}/removeNotification`, { _id: notificationId })
        .then(res => {
            location.assign(`/notifications`)
        })
        .catch(err => alert(err))
}

let removePost = (postId) => {
    axios.post(`http://localhost:7000/${postId}/removePost`)
        .then(res => {
            location.assign("/")
        })
        .catch(err => alert(err))
}

$(() => {
    var count = 1

    document.getElementById("f1").addEventListener('change', showFileName)

    $("#mais1").click(e => {
        e.preventDefault()
        count++

        var campo = $('<div></div>', { class: 'form-group', id: 'f' + count })
        $("#imagess").append(campo)

        var ficheiro = $("<div></div>", { class: "custom-file", id: "ficheiro" + count })
        $(`#f${count}`).append(ficheiro)

        let ficheiroInput = $("<input/>", { class: "custom-file-input", id: "customFile2", type: "file", name: "attachments" })
        let ficheiroLabel = $("<label class='custom-file-label'>Carregar ficheiro</label>")
        $(`#ficheiro${count}`).append(ficheiroInput, ficheiroLabel)

        $("#remover").prop("disabled", false)
        document.getElementById("f" + count).addEventListener('change', showFileName)
    })

    $("#remover").click(e => {
        e.preventDefault()
        if (count >= 2) {
            $("#f" + count).remove()
            count--
        }
    })

    $("#remover").hover(e => {
        e.preventDefault()
        if (count == 1) {
            $("#remover").prop("disabled", true)
        }
    })
})

function showFileName(event) {
    event.srcElement.nextSibling.textContent = event.srcElement.files[0].name
}