// Redirect between pages
let goToPage = (url) => {
    axios.get(`/${url}`)
        .then(() => window.location.assign(`/${url}`))
        .catch(error => console.log(error))
}