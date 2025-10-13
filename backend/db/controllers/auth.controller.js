import { User } from "../models/user.model.js";
import status from "http-status";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "../../utils/generateVerificationToken.js"
import { generateTokenAndSetCookie } from "../../utils/generateTokenAndSetCookie.js"
import { sendVerificationEmailCode, sendWelcomeEmail, sendResetPasswordMail, sendResetSuccessEmail } from "../../mailtrap/emails.js"
import crypto from "crypto"


export const registerHandle = async (req, res) => {
    const { email, password, name } = req.body;

    try {

        if (!email || !password || !name) {
            throw new Error("All Fields is required");
        }

        let isUserExists = await User.findOne({ email });
        if (isUserExists) {
            return res.status(status.BAD_REQUEST).json({ message: "User Already Exists", success: false });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const verificationToken = generateVerificationToken(50)
        console.log(verificationToken)

        const newUser = await User({
            email,
            password: hashedPass,
            name,
            verificationToken,
            verificationTokenExpiressAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24hrs
        });

        await newUser.save();

        // jwtToken Setup
        generateTokenAndSetCookie(res, newUser._id);

        // Dynamically get client URL
        const clientUrl = req.headers.origin || process.env.CLIENT_URL;

        // Send VerificationToken
        await sendVerificationEmailCode(newUser.email, verificationToken);

        res.status(status.CREATED).json({
            message: "New User registered Successfully",
            success: true,
            newUser: {
                ...newUser._doc,
                password: undefined
            }
        });

    } catch (error) {
        res.status(status.BAD_REQUEST).json({ message: error.message, success: false })
    }
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body;

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiressAt: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(status.NOT_FOUND).json({ success: false, message: "Verification Token Fails or expires" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiressAt = undefined;

        await user.save();

        await sendWelcomeEmail(user.email, user.name);
        res.status(status.OK).json({
            success: true, message: "Welcome email has been sent successfully", user: {
                ...user._doc,
                password: undefined
            }
        })

    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message })
    }
}

export const loginHandle = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw new Error("All fields is required")
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(status.BAD_REQUEST).json({ success: false, message: "Invalid Username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(status.UNAUTHORIZED).json({ success: false, message: "Invalid Username or password" });
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();

        await user.save();

        res.status(status.OK).json({
            success: true, message: "User logged in succesfully", user: {
                ...user._doc,
                password: undefined
            }
        });

    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
}


export const logoutHandle = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(status.OK).json({ success: true, messsage: "Logout Successfully!" })
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
}


export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {

        if (!email) {
            throw new Error("All fields are required")
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(status.NOT_FOUND).json({ success: false, message: "Email doesn't exist" });
        }

        // Generate reset token
        const resetPasswordToken = crypto.randomBytes(20).toString("hex");
        const resetPasswordExpiressAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hr later

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpiressAt = resetPasswordExpiressAt

        await user.save();

        // Dynamically get client URL
        const clientUrl = req.headers.origin || process.env.CLIENT_URL;

        // send email
        await sendResetPasswordMail(user.email, `${clientUrl}/#/reset-password/${resetPasswordToken}`);
        res.status(status.OK).json({ success: true, message: "Reset your Password Email has been sent successfully" });
    } catch (error) {
        console.log("Error sending reset your password mail - ", error.message);
        res.status(status.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
}


export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiressAt: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(status.NOT_FOUND).json({ success: false, message: "Invalid token or token expires" });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        user.password = hashedPass;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiressAt = undefined;

        await user.save();

        // Dynamically get client URL
        const clientUrl = req.headers.origin || process.env.CLIENT_URL;

        await sendResetSuccessEmail(user.email, clientUrl);

        res.status(status.OK).json({ success: true, message: "Reset Password Success Email sent successfully!" });

    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
}


export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(status.NOT_FOUND).json({ success: false, message: "User doesn't exists" });
        }

        res.status(status.OK).json({ success: true, message: "User is Found", user });
    } catch (error) {
        console.log("Error in checkAuth - User not found!! - ", error);
        res.status(status.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
    }
}
