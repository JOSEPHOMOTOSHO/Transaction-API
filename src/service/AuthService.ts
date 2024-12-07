import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/UserModel";
import speakeasy from "speakeasy"
import qrcode from "qrcode"
import { saveQRcodetofile } from "../util/utils";


export default class AuthService{

    async register(firstName:string, lastName:string, email:string, password:string){
        try{
            const saltRounds = 10;
    
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const userExists = await User.findOne({email});
            if(userExists){
                return {
                    status: false,
                    message: "User already exists"
                }
            }
    
            const user = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword
            })
    
            const createdUser = await user.save();
            return {
                status: true,
                data: createdUser,
                message: "User created successfully"
            }
        }catch(err:any){
            return {
                status:false,
                message: err.message
            }
        }

    }

    async login(email:string, password:string, token:string){
        try{
            if(!token){
                return {
                    status: false,
                    message: "TOTP required"
                }
            }
            const user = await User.findOne({email});
            if(!user){
                return {
                    status: false,
                    message: "User not found"
                }
            }

            const base32secret = user.totpSecret;

            const isValid = speakeasy.totp.verify({ 
                secret: base32secret,
                encoding: 'base32',
                token: token })

            
            if(!isValid){
                return {
                    status: false,
                    message: "Invalid OTP"
                }
            }

            const isCorrectPassword = await bcrypt.compare(password, user.password);
            if(!isCorrectPassword){
                return {
                    status: false,
                    message: "incorrect password"
                }
            }

            
            const authToken = jwt.sign({userId: user._id}, process.env.SECRET as string, {expiresIn:'1h'});

            return {
                status: true,
                data: authToken,
                message: "User logged in successfully"
            }
    
        }catch(err:any){
            return {
                status:false,
                message: err.message
            }
        }

    }

    //speakeasy has a way to return a QR code
    async setupTOTP(userId: string){
        try{
            const user = await User.findById(userId);
            if(!user){
                return {
                    status: false,
                    message: "User not found"
                }
            }

            const secret = speakeasy.generateSecret();
            user.totpSecret = secret.base32;
            await user.save()
            //qr code data
            const qrCodeData = await qrcode.toDataURL(secret.otpauth_url as string);
            
            return {
                status: true,
                data: qrCodeData,
                message: "QR code generated successfully"
            }

        }catch(err:any){
            return {
                status:false,
                message: err.message
            }
        }

    }


}