//first-name last-name password wallet-balance email
import mongoose, { Schema, model} from "mongoose";
import { IUser } from "./UserModel";

interface IWalletTransaction{
    userId: IUser,
    transactionType: 'credit' | 'debit' ,
    amount: number,
    timestamp: Date
}

const walletTransactionModel = new Schema<IWalletTransaction>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    transactionType:{
        type: String,
        enum: ['credit', 'debit'],
        required:true
    },
    amount:{
        type: Number,
        required: true
    },
    timestamp:{
        type:Date,
        default:Date.now
    }

})

export default model<IWalletTransaction>('WalletTransaction', walletTransactionModel);
