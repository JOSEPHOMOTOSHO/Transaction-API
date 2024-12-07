import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/AuthRoutes";
import walletRoute from "./routes/WalletRoute";

import bodyParser from "body-parser";

dotenv.config()

const connnection = mongoose.connect(process.env.CONNECTION_URL as string).then(() =>{
    console.log("connected successfully")
}).catch((err) => {
    console.log(err)
});

const app = express();
const port = 3005;

app.use(bodyParser.json())
app.use("/auth", authRoute);
app.use("/transaction", walletRoute);


app.listen(port, () => console.log(`server running on ${port}`))