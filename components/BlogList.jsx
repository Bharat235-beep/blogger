"use client"
import { blog_data } from '@/assets/assets'
import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import { toast } from 'react-toastify'
import axios from 'axios'
import SavedBlogs from './SavedBlogs'

const BlogList = () => {
    const [menu,setMenu]=useState('All')
    const [blogs,setBlogs]=useState(null)

    const getBlogs=async()=>{
      try {
        const response=await axios.get('/api/blogs')
        if(response.data.success){
          console.log(response.data)
          setBlogs(response.data.blogs)
        }
        else{
          toast.error(response.data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }

    useEffect(()=>{
    getBlogs()
    },[])

  return blogs && (
    <div className='mx-5'>
      <div className='flex gap-5 flex-wrap justify-center items-center'>
        <button type='button' onClick={()=>setMenu('All')} className={menu==='All'?'bg-black text-white px-3 py-1':''}>All</button>
        <button type='button' onClick={()=>setMenu('Technology')} className={menu==='Technology'?'bg-black text-white px-3 py-1':''}>Technology</button>
        <button type='button' onClick={()=>setMenu('Startup')} className={menu==='Startup'?'bg-black text-white px-3 py-1':''}>Startup</button>
        <button type='button' onClick={()=>setMenu('Lifestyle')} className={menu==='Lifestyle'?'bg-black text-white px-3 py-1':''}>Lifestyle</button>
        <button type='button' onClick={()=>setMenu('Saved')} className={menu==='Saved'?'bg-black text-white px-3 py-1':''}>Saved</button>
      </div>
      <div className='flex flex-wrap justify-around items-center my-5 gap-4 gap-y-10'>
        {
          blogs && menu!=='Saved' &&  blogs.filter((item)=>menu==='All'?true:item.category===menu).map((item,index)=>{
                return(
                    <BlogItem key={index} {...item} type='Save' />
                )
            })
          }
        {  menu==='Saved' &&
        <SavedBlogs/>
        }
      </div>
    </div>
  )
}

export default BlogList
