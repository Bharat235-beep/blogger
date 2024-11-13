import connectDb from "@/lib/config/connectDb";
import { NextResponse } from "next/server";
import fs from 'fs'
import blogModel from "@/lib/models/blogModel";
import deleteFile from "@/lib/helpers/deleteFile";

const loadConnect = async () => {
    await connectDb()
}
loadConnect()
export async function GET(req) {
    try {
        const blogId = await req.nextUrl.searchParams.get("id")
        console.log(blogId)
        if (blogId) {
            const blog = await blogModel.findById(blogId)
            return NextResponse.json({ success: true, blog })
        }
        else {
            const blogs = await blogModel.find({})
            return NextResponse.json({ success: true, blogs })

        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error.message })
    }

}

export async function DELETE(req) {
    try {
        const blogId = req.nextUrl.searchParams.get('id')
        const blog = await blogModel.findById(blogId)
        const secondaryPath = `./public${blog.image}`;
        const primaryPath = `${blog.image}`;
        // Check if file exists at primary path, if not, try secondary path
        fs.access(primaryPath, fs.constants.F_OK, (err) => {
            if (err) {
                // If primary path doesn't exist, try secondary path
                fs.access(secondaryPath, fs.constants.F_OK, (err) => {
                    if (err) {
                        console.error('File does not exist at either location');
                    } else {
                        deleteFile(secondaryPath);
                    }
                });
            } else {
                deleteFile(primaryPath);
            }
        });
        // fs.unlink(`./public${blog.image}` || `${blog.image}`, (err) => {
        //     if (err) throw err;
        //     console.log('File was deleted');
        // });

        await blogModel.findByIdAndDelete(blogId)
        return NextResponse.json({ success: true, message: 'Blog Deleted' })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error.message })
    }
}

export async function POST(req) {
    try {

        const formData = await req.formData()

        console.log(formData)
        const title = await formData.get('title')
        const description = await formData.get('description')
        const category = await formData.get('category')
        const author = await formData.get('author')
        const image = await formData.get('image')
        const authorImg = await formData.get('authorImg')
        if (!title || !description || !category || !author || !image || !authorImg) {
            return NextResponse.json({ success: false, message: "Missing Details" })
        }
        console.log(image)
        console.log(authorImg)
        const timeStamp = Date.now()
        const path = `./public/${timeStamp}_${image.name}`
        const imageByteData = await image.arrayBuffer()
        const buffer = await Buffer.from(imageByteData)
        await fs.writeFileSync(path || `/${timeStamp}_${image.name}`, buffer)

        //  const authorImgpath=`./public/${authorImg.name}`
        //  const authorImgByteData=await authorImg.arrayBuffer()
        //  const authorImgbuffer=await Buffer.from(authorImgByteData)
        //  await fs.writeFileSync(authorImgpath,authorImgbuffer)




        const imageUrl = `/${timeStamp}_${image.name}`
        console.log(imageUrl)

        //uploading image to cloudinary

        //  const imageUpload= await cloudinary.uploader.upload(image.name,{resource_type:'image'})
        //  const imageUrl=await imageUpload.secure_url
        // console.log(imageUrl)

        // const authImgUpload= await cloudinary.uploader.upload(authorImg.name,{resource_type:'image'})
        // const authImgUrl=await authImgUpload.secure_url
        // console.log(authImgUrl)


        await blogModel.create({
            title, description,
            author, category,
            image: imageUrl,
            authorImg
            // authorImg:`/${authorImg.name}`
        })

        return NextResponse.json({ success: true, message: "Blog Added" })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error.message })
    }
}