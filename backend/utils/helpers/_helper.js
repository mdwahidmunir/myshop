const sanitizeUser = (user) => {
    const removeField = ['_id', '__v', 'salt', 'password', 'otp', 'otpExpiry']
    return Object.keys(user)
        .filter(key => !removeField.includes(key))
        .reduce((sanitizedUser, filteredKey) => {
            sanitizedUser[filteredKey] = user[filteredKey]
            return sanitizedUser
        }, {})
}

const sanitizeShippingDetails = (shippingDetails) => {
    const removeField = ['__v', 'userId', '_id']

    return Object.keys(shippingDetails)
        .filter(key => !removeField.includes(key))
        .reduce((sanitizedDetails, filteredKey) => {
            sanitizedDetails[filteredKey] = shippingDetails[filteredKey]
            return sanitizedDetails
        }, {})
}

module.exports = { sanitizeUser, sanitizeShippingDetails }