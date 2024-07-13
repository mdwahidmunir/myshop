const nodeMailer = require('nodemailer')
const path = require('path')
const dotenv = require('dotenv')
const fs = require('fs')
const generateOTP = require('./otpGenerator')

const { WELCOME_TEMPLATE, OTP_TEMPLATE } = require('./templates')

dotenv.config({ path: path.join('..', '.env') })

const { EMAIL, APP_PASS } = process.env

const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: EMAIL,
        pass: APP_PASS
    }
})

const replaceContent = (content, kwargs) => {
    const keys = Object.keys(kwargs)
    keys.forEach((key) => {
        content = content.replace(`#{${key}}`, kwargs[key])
    })
    return content
}

const emailHelper = async (transporter, template, kwargs) => {
    try {
        const template_path = path.join(__dirname, 'email_templates', template)
        const content = await fs.promises.readFile(template_path, 'utf-8')

        const mailOptions = {
            to: EMAIL,
            from: EMAIL,
            subject: 'Welcome to MyShop',
            html: replaceContent(content, kwargs)
        }

        await transporter.sendMail(mailOptions)
    }
    catch (err) {
        console.log(err)
    }
}

emailHelper(transporter, OTP_TEMPLATE, { username: 'Wahid', otp: generateOTP() })
