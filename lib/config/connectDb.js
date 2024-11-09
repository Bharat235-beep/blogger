import mongoose from "mongoose";

let isConnected=false;
const connectDb=async()=>{
    try {
        if(!isConnected){
            isConnected=true
            await mongoose.connect('mongodb+srv://rajkumar45burail:bharat%402003@cluster0.m74pjfv.mongodb.net/blog-app')
            console.log('Database Connected')
        } 
        else{
            return
        }       
    } catch (error) {
        console.log(object)
    }
}
export default connectDb