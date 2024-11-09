import { NextResponse } from "next/server"
import bcrpyt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from "@/lib/models/userModel"
import { headers } from "next/headers"
import connectDb from "@/lib/config/connectDb"
const loadConnect=async()=>{
    connectDb()
}
loadConnect()
export async function POST(req) {
    try {
        const {name,email,password}=await req.json()
        if(!name || !email || !password){
            return NextResponse.json({success:false,message:'Missing Details'})
        }
        const isExist=await userModel.findOne({email})
        if(isExist){
            return NextResponse.json({success:false,message:'Email already exist'})
        }
        const salt=await bcrpyt.genSalt(10)
        const hashPass=await bcrpyt.hash(password,salt)
        const user=await userModel.create({
            name,
            email,
            password:hashPass
        })
        const token=await jwt.sign({id:user._id},process.env.JWT_SECRET)
        // const verify=await jwt.verify(token,process.env.JWT_SECRET)
        // console.log(verify)
        return NextResponse.json({success:true,token})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false,message:error.message})
    }
}

export async function GET(req){
    try {
        const token=(await headers()).get('token')
        console.log(token)
        const decode=await jwt.verify(token,process.env.JWT_SECRET)
        console.log(decode)

        const user=await userModel.findById(decode.id).select('-password')
        if(!user){
            return NextResponse.json({success:false,message:'User not exist'})
        }

        return NextResponse.json({success:true,user})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success:false,message:error.message})
    }
}