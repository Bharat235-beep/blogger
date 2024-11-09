"use client"
import { assets } from '@/assets/assets'
import { AppContext } from '@/context/AppContext'
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import Typewriter from 'typewriter-effect';

const Header = () => {
  const { token,setToken ,user,setUser } = useContext(AppContext)

  const logout=async()=>{
    localStorage.removeItem('blog-token')
    setToken(null)
    setUser(null)
  }
  useEffect(()=>{
    console.log(token)
    if(user)
    console.log(user)
  },[token])

  return (
    <div className='mx-10 py-5'>
      <div className='flex justify-between items-center'>
        <Image alt='' src={assets.logo} width={150} className='w-20 sm:w-40' />
        <button className='flex items-center justify-between gap-2 text-xs sm:text-base text-nowrap font-medium border border-black w-fit sm:w-40 px-1 py-2 sm:px-3 shadow-[-5px_5px_0px] active:scale-90 transition-all duration-100 active:shadow-[-2px_2px_0px]'>
          {!token &&<a href="/login">Create Account</a>}
          {token && user && <span onClick={logout}>LogOut</span>}
          <Image alt='' src={assets.arrow} width={15} className='w-2 sm:w-5' />
          </button>
      </div>
      <div className='flex flex-col justify-center items-center gap-3 mt-10'>
        {token && user &&<h1 className='text-3xl text-violet-600 sm:text-4xl font-medium'>
          <Typewriter
  options={{
    strings: [`Hi,${user.name}`],
    autoStart: true,
    loop:true,
    pauseFor:10000
  }}
/>
          </h1>}
        <h1 className='text-3xl sm:text-4xl font-medium'>Latest Blogs</h1>
        <p className='max-w-[550px] text-xs sm:text-base text-center'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..</p>
        <div className='border border-black w-auto sm:w-96 flex'>
          <input type="text" placeholder='Enter email' className='outline-none flex flex-1 py-2 pl-2' />
          <button type='button' className='border-l p-2 border-black active:bg-gray-500 active:text-white'>Subscribe</button>
        </div>
      </div>
    </div>
  )
}

export default Header
