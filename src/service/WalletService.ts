import mongoose from "mongoose"
import Wallet from "../model/WalletTransaction";
import User from "../model/UserModel";


export default class WalletService{
    async credit(userId:string, amount:number){
        const session = await mongoose.startSession();
        session.startTransaction();
        try{
            const user = await User.findById(userId).session(session);
            if(!user){
                return {
                    status: false,
                    message: "User not found"
                }
            }

            if(amount < 0 ){
                return {
                    status: false,
                    message: "invalid transaction"
                }
            }

            user.walletBalance += amount;
            await user.save({session});
            const walletTransaction = new Wallet({
                userId,
                amount,
                transactionType: 'credit',
            })

            await walletTransaction.save({session});
            await session.commitTransaction();
            session.endSession();
            return {
                status: true,
                data: user.walletBalance,
                message: "Wallet credited successfully"
            }

        }catch(err:any){
            await session.abortTransaction()
            session.endSession()
            return {
                status:false,
                message: err.message
            }
        }

    }

    async debit(userId:string, amount:number){
        //do a transaction to undo all the operations if one of them fails.
        const session = await mongoose.startSession();
        session.startTransaction();
        try{
            //retrieve user 
            const user = await User.findById(userId).session(session);
            if(!user){
                return {
                    status: false,
                    message: "User not found"
                }
            }

            if(amount < 0 ){
                return {
                    status: false,
                    message: "invalid transaction"
                }
            }

            if(user.walletBalance < amount ){
                return {
                    status: false,
                    message: "insufficient funds"
                }
            }

            user.walletBalance -= amount;
            await user.save({session});

            const walletTransaction = new Wallet({
                userId,
                amount,
                transactionType: 'debit',
            })

            await walletTransaction.save({session});
            await session.commitTransaction();
            session.endSession();
            return {
                status: true,
                data: user.walletBalance,
                message: "Wallet debited successfully"
            }

        }catch(err:any){
            await session.abortTransaction()
            session.endSession()
            return {
                status:false,
                message: err.message
            }
        }

    }
    
    async balance(userId:string){
        try{
            const user = await User.findById(userId);
            if(!user){
                return {
                    status: false,
                    message: "User not found"
                }
            }

            const balance = user.walletBalance;
            return {
                status: true,
                data: balance,
                message: "Balance retrieved successfully"
            }
        }catch(err:any){

            return {
                status:false,
                message: err.message
            }
        }

    }
}