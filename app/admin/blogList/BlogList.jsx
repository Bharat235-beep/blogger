"use client"
import BlogTableRow from '@/components/adminComponents/BlogTableRow'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const BlogList = () => {
  const [blogs,setBlogs]=useState(null)
  const getBlogs=async()=>{
  
    try {
      const data=(await axios.get('/api/blogs')).data
      if(data.success){
        console.log(data)
       setBlogs(data.blogs)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const deleteBlog=async(id)=>{
    let toastId=toast.loading('Please Wait...')
    try {
      const response=await axios.delete('/api/blogs',{
        params:{
          id:id
        }
      })
      console.log(response.data)
      if(response.data.success){
        toast.update(toastId,{type:'success',render:response.data.message,isLoading:false,closeButton:null,autoClose:4000})
        getBlogs()
      }
      else{
        toast.update(toastId,{type:'error',render:response.data.message,isLoading:false,closeButton:null,autoClose:4000})
      }
    } catch (error) {
      console.log(error)
      toast.update(toastId,{type:'error',render:error.message,isLoading:false,closeButton:null,autoClose:4000})
    }
  }

  useEffect(()=>{
    getBlogs()
  },[])

  return (
    <div className='mx-1 sm:mx-5 py-5 w-full max-h-[80vh] overflow-y-scroll'>
      <p className='text-2xl text-gray-700 font-medium'>Blog List</p>
      <table className='w-full border border-gray-600'>
        <thead className='max-sm:hidden w-full bg-gray-50 border-b text-left uppercase text-gray-700 py-5 font-medium'>
          <tr>
            <th className='py-3'>Author</th>
            <th className='py-3'>Blog Title</th>
            <th className='py-3'>Date</th>
            <th className='py-3'>Action</th>
          </tr>
        </thead>
        <tbody className='gap-10'>
        {
          blogs && blogs.map((item)=>{
            return(
              <BlogTableRow key={item._id} deleteBlog={deleteBlog} {...item} />
            )
          })
        }
        </tbody>
      </table>
    </div>
  )
}

export default BlogList
