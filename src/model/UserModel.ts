//first-name last-name password wallet-balance email
import mongoose, { Schema, model} from "mongoose";

export interface IUser{
    firstName: string,
    lastName: string,
    email: string,
    walletBalance: number,
    password: string,
    totpSecret: string
}

const userModel = new Schema<IUser>({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        unique: true,
        type: String
    },
    walletBalance:{
        type: Number,
        default: 0
    },
    password: {
        type: String,
        required: true
    },

    totpSecret:{
        type: String,

    }

})

export default model<IUser>('User', userModel);
