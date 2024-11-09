"use client"
import { assets } from '@/assets/assets'
import { AdminContext } from '@/context/AdminContext'
import Image from 'next/image'
import React, { useContext } from 'react'

const Navbar = () => {
  const {atoken,logOut}=useContext(AdminContext)
  return atoken && (
    <div className='flex justify-between items-center w-full bg-slate-100 border-b border-black py-1 sm:py-3 px-2 sm:px-4'>
     <div className='flex items-center gap-1'>
        <Image alt='' src={assets.logo} width={120}/>
        <p className='text-xs border border-black rounded-full p-0.5'>Admin Panel</p>
     </div>
     <div>
        <button type='button' onClick={logOut}
        className='bg-red-500 text-sm text-white px-2 py-1 rounded-full active:bg-red-300'
        >
          LogOut</button>
     </div>
    </div>
  )
}

export default Navbar
