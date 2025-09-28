import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplate.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmailCode = async (email, verificationToken) => {


    const recipients = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipients,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        })

        console.log("Email sent successfully", response);
    } catch (error) {
        console.log("Email Verification Error - ", error.message)
        throw new Error(`Email verification error - ${error}`)
    }
}


export const sendWelcomeEmail = async (email, name) => {
    const recipients = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipients,
            subject: "Welcome Email to Freelancer HUB",
            html: WELCOME_EMAIL_TEMPLATE.replace("{username}", name),
            category: "Welcome Email"
            // template_uuid: "1ddc4659-3b78-4d05-b75f-53085dde2476",
            // template_variables: {
            //     "name": name
            // }
        })
        console.log("Welcome Email sent successfully", response);
    } catch (error) {
        console.log(" Welcome Email  Error - ", error.message)
        throw new Error(`Welcome Email  error - ${error}`)
    }
}


export const sendResetPasswordMail = async (email, resetUrl) => {
    const recipients = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipients,
            subject: "Reset your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
            category: "Reset Password"
        })
        console.log("Reset your Password Request Email sent Successfully!");
    } catch (error) {
        console.log(" Reset your Password Request Email Error - ", error.message)
        throw new Error(`Reset your Password Request Email error - ${error}`)
    }
}


export const sendResetSuccessEmail = async (email) => {
    const recipients = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipients,
            subject: "Password Changes Successfully",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Changed"
        })
        console.log("Reset your Password Success Email sent Successfully!");

    } catch (error) {
        console.log(" Reset your Password Success Email Error - ", error.message)
        throw new Error(`Reset your Password Success Email error - ${error}`)
    }
}