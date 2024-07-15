const nodeMailer = require('nodemailer')
const path = require('path')
const dotenv = require('dotenv')
const fs = require('fs')
const { WELCOME_TEMPLATE, OTP_TEMPLATE } = require('./templates')

// dotenv.config({ path: path.join('..', '.env') }) // Use it only when you want to run this module separately
dotenv.config()


const { SENDER_EMAIL, APP_PASS } = process.env

const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: SENDER_EMAIL,
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

const emailHelper = async (template, mailRecepient, kwargs) => {
    try {
        const template_path = path.join(__dirname, 'email_templates', template)
        const content = await fs.promises.readFile(template_path, 'utf-8')

        const mailOptions = {
            to: mailRecepient,
            from: SENDER_EMAIL,
            subject: 'Welcome to MyShop',
            html: replaceContent(content, kwargs)
        }

        await transporter.sendMail(mailOptions)
        console.log("Mail Succesfully Sent to recepient/s :: ", mailRecepient)
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = emailHelper

// emailHelper(WELCOME_TEMPLATE, SENDER_EMAIL, { username: 'Wahid' })
