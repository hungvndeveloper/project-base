const base64url = str => {
    return btoa(str).replace(/\+/, '-') // thay thế tất cả dấu + thành dấu -
        .replace(/\//, '-') // thay thế tất cả dấu / thành dấu -
        .replace(/\=/, '') // tất cả dấu bằng thì sẽ bị loại bỏ đi
}

module.exports = { base64url }