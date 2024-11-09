import mongoose from "mongoose";

const savedBlogSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    blogId:{type:String,required:true},
    title:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true},
    author:{type:String,required:true},
    category:{type:String,required:true},
    authorImg:{type:String,required:true},
    date:{type:String,default:Date()},
})

const savedBlogModel=mongoose.models.savedBlogs || mongoose.model('savedBlogs',savedBlogSchema)
export default savedBlogModel