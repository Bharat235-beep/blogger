import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import userModel from "@/lib/models/userModel";
import connectDb from "@/lib/config/connectDb";
const loadConnect=async()=>{
    connectDb()
}
loadConnect()
export async function POST(req) {
    try {
        const {email,password}=await req.json()
        if(!email || !password){
            return NextResponse.json({success:false,message:'Missing Details'})
        }
        if(email+password!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return NextResponse.json({success:false,message:'Invalid Credentials'})
        }
        const token=await jwt.sign(email+password,process.env.JWT_SECRET)
        const decode=await jwt.verify(token,process.env.JWT_SECRET)
        console.log(decode)
        return NextResponse.json({success:true,token})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false,message:error.message})
    }
}

export async function GET(req)  {
    try {
        const users=await userModel.find({}).select('-password')
        return NextResponse.json({success:true,users})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false,message:error.message})
    }
}