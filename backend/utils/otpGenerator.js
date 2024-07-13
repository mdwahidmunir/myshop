const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numerics = '0123456789'

const paramMap = ['lowerCase', 'upperCase', 'numerics']
const paramMatrix = {
    lowerCase: {
        value: lowerCase,
        occurence: 0,
    },
    upperCase: {
        value: upperCase,
        occurence: 0,
    },
    numerics: {
        value: numerics,
        occurence: 0,
    }
}

const generateOTP = () => {
    const maxLength = 7
    const maxOccurence = Math.floor(maxLength / 2)
    let currentLength = 0
    let otp = ''

    while (currentLength < maxLength) {
        let paramIndex = Math.floor(Math.random() * 3)
        let param = paramMap[paramIndex]

        let isTheParamAllowed = paramMatrix[param]['occurence'] < maxOccurence

        if (!isTheParamAllowed)
            continue

        paramMatrix[param]['occurence'] += 1
        let randomCharString = paramMatrix[param]['value']
        let lengthOfRandomCharString = randomCharString.length
        let randomCharIndex = Math.floor(Math.random() * lengthOfRandomCharString)
        let randomChar = randomCharString[randomCharIndex]
        otp += randomChar

        currentLength += 1
    }
    return otp
}

module.exports = generateOTP