"use client"
import { assets } from '@/assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const AddBlog = () => {
  const [image,setImage]=useState(false)
  const [data,setData]=useState({
    title:'',
    description:'',
    authorImg:'/profile_icon.png',
    author:'Bharat Kumar',
    category:'Startup'
  })
  const handleOnChange=(e)=>{
    setData({
      ...data,
      [e.target.name]:e.target.value
    })
  }

  const handleOnSubmit=async(e)=>{
    e.preventDefault()
    let toastId=toast.loading('Please Wait...')
    try {
      const formData=new FormData()
      formData.append('title',data.title)
      formData.append('description',data.description)
      formData.append('category',data.category)
      formData.append('author',data.author)
      formData.append('authorImg',data.authorImg)
      formData.append('image',image)
      const response=await axios.post('/api/blogs',formData)
      console.log(response.data)
      if(response.data.success){
        setData({
          title:'',
          description:'',
          authorImg:'/profile_icon.png',
          author:'Bharat Kumar',
          category:'Startup'
        })
        setImage(false)
        toast.update(toastId,{type:'success',render:response.data.message,isLoading:false,closeButton:null,autoClose:4000})
        // toast.success(response.data.message)
      }
      else{
        toast.update(toastId,{type:'error',render:response.data.message,isLoading:false,closeButton:null,autoClose:4000})
        // toast.error(response.data.message)
      }
    } catch (error) {
      toast.update(toastId,{type:'error',render:response.data.message,isLoading:false,closeButton:null,autoClose:4000})
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col gap-3 sm:mx-5 max-h-[80vh] overflow-y-scroll w-full py-2'>
      <p className='text-2xl font-medium text-gray-700'>Add Blog Details</p>
      <form onSubmit={handleOnSubmit} className='px-2 mt-2'>
        <p className='mt-4 text-xl text-gray-700'>Upload thumbnail</p>
        <label htmlFor='thumbnail'>
          <Image alt='' src={image?URL.createObjectURL(image):assets.upload_area} width={140} height={70} className='cursor-pointer w-40 mt-1'/>
          <input type="file" id='thumbnail' onChange={(e)=>setImage(e.target.files[0])} required hidden />
        </label>
        <p className='mt-4 text-xl text-gray-700'>Blog Title</p>
        <input name='title' value={data.title} onChange={handleOnChange} type="text" placeholder='Type here...' className='w-full sm:w-96 mt-1 p-1 border border-gray-500 rounded' />
        <p className='mt-4 text-xl text-gray-700'>Blog Description</p>
        <textarea name='description' value={data.description} onChange={handleOnChange} rows={5} placeholder='Type here...' className='w-full sm:w-96 mt-1 p-1 border border-gray-500 rounded' />
        <p className='mt-4 text-xl text-gray-700'>Blog Category</p>
        <select name="category" value={data.category} onChange={handleOnChange} className='w-full sm:w-96 mt-1 p-1 border border-gray-500 rounded' >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        
        <button type='button' onClick={handleOnSubmit} className='w-full sm:w-40 px-2 py-1 bg-black text-white mt-4 rounded'>Add Blog</button>
      </form>
    </div>
  )
}

export default AddBlog
