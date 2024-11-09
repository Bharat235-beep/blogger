"use client"
import { AppContext } from '@/context/AppContext'
import React, { useContext, useEffect } from 'react'
import BlogItem from './BlogItem'

const SavedBlogs = () => {
    const {token,getSavedBlogs,blogs}=useContext(AppContext)    

    useEffect(()=>{
        if(token){
            getSavedBlogs()
        }
    },[token])
  return token && blogs &&(
    <div>
      <h2 className='text-2xl text-center text-violet-500 font-bold'>Saved {blogs.length} blogs</h2>
      <div className='flex flex-wrap gap-y-10 gap-5 py-5'>

        {
            blogs.length>0 && 
            blogs.map((item)=>{
              console.log({...item})
                return(
                    <BlogItem key={item._id} {...item}
                      type='Delete'/>
                )
            })
        }
      </div>
    </div>
  )
}

export default SavedBlogs
