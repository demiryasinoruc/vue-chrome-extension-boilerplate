module.exports = {
    delay: (timeout) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, timeout);
        })
    },
    clone: (obj) => {
        return JSON.parse(JSON.stringify(obj))
    }
}