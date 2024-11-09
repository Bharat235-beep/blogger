import { NextResponse } from "next/server"
import bcrpyt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from "@/lib/models/userModel"
import connectDb from "@/lib/config/connectDb"
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
        const user=await userModel.findOne({email})
        if(!user){
            return NextResponse.json({success:false,message:'User not found'})
        }
        const check=await bcrpyt.compare(password,user.password)
        if(!check){
            return NextResponse.json({success:false,message:'Incorrect Password'})
        }
        const token=await jwt.sign({id:user._id},process.env.JWT_SECRET)
        const verify=await jwt.verify(token,process.env.JWT_SECRET)
        console.log(verify)
        return NextResponse.json({success:true,token})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false,message:error.message})
    }
}