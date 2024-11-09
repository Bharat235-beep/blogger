import savedBlogModel from "@/lib/models/savedBlogs"
import { headers } from "next/headers"
import jwt from 'jsonwebtoken'
import { NextResponse } from "next/server"
import connectDb from "@/lib/config/connectDb"
const loadConnect=async()=>{
    connectDb()
}
loadConnect()
export async function POST(req) {
    try {
        const {blogId,userId,title,description,image,author,category,authorImg,date}=await req.json()
        if(!userId|| !title|| !description|| !image|| !author|| !category|| !authorImg|| !date){
            return NextResponse.json({success:false,message:"Missing Details"})
        }
        const isExist=await savedBlogModel.findOne({userId,blogId})
        if(isExist){
            return NextResponse.json({success:true,message:"Saved Successfully"})
        }
        await savedBlogModel.create({
            userId,blogId,title,description,
            image,author,category,
            authorImg,date   
        })
        return NextResponse.json({success:true,message:"Saved Successfully"})

    } catch (error) {
        console.log(error)  
        return NextResponse.json({success:false,message:error.message})
    }
}
export async function GET(req) {
    try {
        const token=(await headers()).get('token')
        console.log(token)
        const decode=await jwt.verify(token,process.env.JWT_SECRET)
        console.log(decode)
        const savedBlogs=await savedBlogModel.find({userId:decode.id})
        return NextResponse.json({success:true,savedBlogs})
        
        
    } catch (error) {
        console.log(error)  
        return NextResponse.json({success:false,message:error.message})
    }
}
export async function DELETE(req) {
    try {
        const blogId=req.nextUrl.searchParams.get('id')
        const token=(await headers()).get('token')
        console.log(token)
        const decode=await jwt.verify(token,process.env.JWT_SECRET)
        console.log(decode)
        const savedBlog=await savedBlogModel.findById(blogId)
        if(savedBlog.userId!==decode.id){
            return NextResponse.json({success:false,message:'Unauthorized Access'})
        }
        await savedBlogModel.findByIdAndDelete(blogId)
        
        return NextResponse.json({success:true,message:'Blog Deleted'})
        
        
    } catch (error) {
        console.log(error)  
        return NextResponse.json({success:false,message:error.message})
    }
}