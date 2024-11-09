import connectDb from "@/lib/config/connectDb"
import savedBlogModel from "@/lib/models/savedBlogs"
import { NextResponse } from "next/server"
const loadConnect=async()=>{
    connectDb()
}
loadConnect()
export async function GET(req) {
    try {
        const blogId=await req.nextUrl.searchParams.get("id")
        console.log(blogId)
        if(blogId){
            const blog=await savedBlogModel.findById(blogId)
            return NextResponse.json({success:true,blog})
        }
        else{
            const blogs=await savedBlogModel.find({})
            return NextResponse.json({success:true,blogs})

        }
    } catch (error) {
        console.log(error)  
        return NextResponse.json({success:false,message:error.message})
    }
    
}
