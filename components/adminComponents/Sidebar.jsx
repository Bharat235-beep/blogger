"use client"
import { assets } from '@/assets/assets'
import { AdminContext } from '@/context/AdminContext'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'

const Sidebar = () => {
  const {atoken}=useContext(AdminContext)
  return atoken && (
    <div className='flex flex-col w-28 sm:w-44 px-1.5 py-3 border-r bg-slate-50 border-black h-[90vh]'>
      <div className='flex flex-col w-full gap-3 mt-3'>
        <Link className='flex items-center gap-0.5 sm:gap-1 border border-black shadow-[-4px_4px_0px] py-1 px-0.5 sm:px-3' href={'/admin/addBlog'}>
        <Image alt="" width={25} src={assets.add_icon} className='w-4 h-4 sm:w-7 sm:h-7' />
        <p className='text-[9px] sm:text-sm'>Add Blog</p>
        </Link>
        <Link className='flex items-center gap-0.5 sm:gap-1 border border-black shadow-[-4px_4px_0px] py-1 px-0.5 sm:px-3' href={'/admin/blogList'}>
        <Image alt="" width={25} src={assets.blog_icon} className='w-4 h-4 sm:w-7 sm:h-7' />
        <p className='text-[9px] sm:text-sm'>Blog List</p>
        </Link>
        <Link className='flex items-center gap-0.5 sm:gap-1 border border-black shadow-[-4px_4px_0px] py-1 px-0.5 sm:px-3' href={'/admin/subscription'}>
        <Image alt="" width={25} src={assets.email_icon} className='w-4 h-4 sm:w-7 sm:h-7' />
        <p className='text-[9px] sm:text-sm'>Subscription</p>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
