export const getHashParams = () => {
    // get "Hash Parameters" after redirecting post-authentication & separate the various parameters returned (will specifically need the "access_token" parameter for various uses later)
    return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
        if (item) {
            let parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1])
        }
        return initial
    }, {})
}

// Clear all hash params after redirecting to not publicly display them to the user in the redirected URL
export const removeHashParams = () => {
    window.history.pushState("", document.title, window.location.pathname + window.location.search)
}
