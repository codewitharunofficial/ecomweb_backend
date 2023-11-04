import userModel from "../Models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import nodemailer from 'nodemailer';
// import uuid from ('node-uuid');


export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body
        //Validation
        if (!name) {
            return res.send({ message: 'Name Is Required' })
        }
        if (!email) {
            return res.send({ message: 'Email Is Required' })
        }
        if (!password) {
            return res.send({ message: 'Password Is Required & Should contain Combination of uppercase, lowercase, number & a special Character' })
        }
        if (!address) {
            return res.send({ message: 'Address Is Required' })
        }
        if (!phone) {
            return res.send({ message: 'Phone Is Required' })
        }
        if(!answer){
            return res.send({ message: 'Answer Is Required' })
        }

        // user Check
        const existingUser = await userModel.findOne({ email });

        //existing user check
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Registered, Please Login"
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)
        //save

        const user = await new userModel({ name, email, phone, address, password: hashedPassword, answer }).save()

        res.status(200).send(({
            success: true,
            message: "You've Registered Successfully",
            user
        }))

    } catch (error) {
        console.log(error)
        res.status(200).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
};

//Post  LOGIN

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(200).send({
                success: false,
                message: 'Invald Email Or Password'
            })
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(200).send({
                success: false,
                message: 'Email is not Registered!! Please Sign Up to Register'
            })
        }
        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid Credentials'
            });
        }

        //token

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).send({
            success: true,
            message: `Welcome Back!! ${user.name}`,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error Logging in',
            error
        })
    }
}

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({
                message: 'Email is required'
            })
        }

        if (!newPassword) {
            res.status(400).send({ message: 'New Password Is Required' })
        }

        if (!answer) {
            return res.status(400).send({
                success: false,
                message: "Answer is Required"
            })
        }


        const user = await userModel.findOne({ email, answer })
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email Or Answer"
            })
        }
        
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something Went Wrong",
            error
        })
    }
}

export const testController = (req, res) => {
    res.send("Protected Route")
};

export const emailOTPVerification = async (req, res) => {


     const OTP = async (req, res) => {
        try {

    
            const otpStorage = new Map();
            const {email} = req.params;
            const otp = generateOTP();
    
            //configure Nodemailer with your email service providers
    
            const transporter = nodemailer.createTransport({
                service: 'app.mailjet.com',
                auth: {
                     user: 'kumarrvee@gmail.com',
                     pass: '321Hustl3'
                }
            });
    
            //generate a  random 6 digit otp
    
            function generateOTP() {
                return Math.floor(100000 + Math.random() * 900000);
            }
    
            //send an OTP to the user's email
    
            function sendOTPByEmail (email, otp) {
                 const mailOptions = {
                    from: 'kumarrvee@gmail.com',
                    to: email,
                    subject: 'OTP Verification',
                    text: `Your OTP is: ${otp}`
                 };
    
                 return new Promise((resolve, reject) => {
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve('Email sent: ' + info.response);
                        }
                    });
                 });
            }
    
            
    otpStorage.set(email, otp);

    sendOTPByEmail(email, otp).then((result) => {
        console.log(result);
        res.json({message: 'OTP Sent Successfully'})
    }).catch ((error) => {
        console.error(error);
        res.status(500).json({ error: "Failed to send OTP"});
    });

} catch (error) {
    console.log(error)
}
}

}

//update user profile

export const updateProfileCOntroller = async (req, res) => {
    try {
        
        const {name, address, phone, email, password} = req.body;
        const user = await userModel.findById(req.user._id);

        //password
        if(!password && password.length < 6) {
            return res.json({error: 'Password Is Required and Should Be of Atleast 6 Characters '});
        } else {
            const hashedPassword = password ? await hashPassword(password) : undefined;
            const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
                name: name || user.name,
                email: email || user.email,
                phone: phone || user.phone,
                password: hashedPassword || user.password,
                address: address || user.address
            }, {new: true})
            res.status(200).send({
                success: true,
                message: 'Successfully Updated User Profile',
                updatedUser
            });
        }


    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error While Updating User",
            error
        })
    }
}