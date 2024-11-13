"use client"
import { assets, blog_data } from '@/assets/assets'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Blogs = () => {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const getBlogData = async() => {
    try {
      const res=await axios.get('/api/blogs',{
        params:{
          id:id
        }
      })
      if(res.data.success){
        console.log(res.data)
        setData(res.data.blog)
      }
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
    // for (let i = 0; i < blog_data.length; i++) {
    //   if (blog_data[i].id === Number(id)) {
    //     setData(blog_data[i])
    //     console.log(blog_data[i])
    //     break
    //   }
    // }
  }
  useEffect(()=>{
    if(id){
      getBlogData()

    }
  },[id])

  return data &&(
    <div className='flex flex-col justify-center items-center'>
        <div className='flex justify-between items-center bg-gray-200 w-full px-5 py-2'>
          <Link href={'/'}>
        <Image alt='' src={assets.logo} width={150} className='w-20 sm:w-40' />
          </Link>
        <button className='flex items-center justify-between gap-2 text-xs sm:text-base text-nowrap font-medium border border-black w-fit sm:w-40 px-1 py-2 sm:px-3 shadow-[-5px_5px_0px] active:scale-90 transition-all duration-100 active:shadow-[-2px_2px_0px]'>Get Started
            <Image alt='' src={assets.arrow} width={15} className='w-2 sm:w-5'/></button>
      </div>
      <div className='flex flex-col gap-5 bg-gray-200 w-full py-10 justify-center items-center'>
        <h1 className='text-3xl font-semibold text-center max-w-[600px]'>{data.title}</h1>
        <div>
        <Image alt='' src={data.authorImg} width={40} height={40} className='rounded-full border-3 mx-auto border-white'/>
        <p className='font-medium text-lg text-center'>{data.author}</p>
        <p className='font-medium text-xs sm:text-sm text-center text-gray-600'>Uploaded On {new Date(data.date).toDateString()}</p>
        </div>
   
      </div>
      <div className='px-2 sm:px-0'>
        <Image alt='' src={data.image} width={700} height={400} className='border-4 border-white -mt-4'/>
        <p className='text-2xl font-semibold'>Description</p>
        <div>
          <p className='text-sm sm:text-base'>{data.description}</p>
        </div>
      <div className='flex flex-col gap-3 mt-5'>
        <p className='text-gray-900 font-medium'>Share this article on social media</p>
        <div className='flex gap-3 '>
          <Image alt='' width={50} src={assets.facebook_icon}/>
          <Image alt='' width={50} src={assets.twitter_icon}/>
          <Image alt='' width={50} src={assets.googleplus_icon}/>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Blogs
