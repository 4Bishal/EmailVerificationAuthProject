import mongoose from "mongoose";


export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL).then(() => {
            console.log(`Connected to mongoDb with uri : ${process.env.MONGO_URL}`);
        })
    } catch (error) {
        console.log("Some Error occur : ", error.message);
    }
}