const sanitizeUser = (user) => {
    const removeField = ['__v', 'salt', 'password', 'otp', 'otpExpiry']
    return Object.keys(user)
        .filter(key => !removeField.includes(key))
        .reduce((sanitizedUser, filteredKey) => {
            sanitizedUser[filteredKey] = user[filteredKey]
            return sanitizedUser
        }, {})
}

module.exports = { sanitizeUser }