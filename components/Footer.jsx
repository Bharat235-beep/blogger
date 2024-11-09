import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='bg-black text-white flex flex-col sm:flex-row gap-5 justify-around items-center p-5'>
      <Image alt='' src={assets.logo_light} width={200}/>
      <p className='font-medium text-center'>Copyright &copy; ,All rights reserved @blogger</p>
      <div className='flex flex-wrap gap-2'>
      <Image alt='' className='cursor-pointer w-10' src={assets.facebook_icon} width={20}/>
      <Image alt='' className='cursor-pointer w-10' src={assets.twitter_icon} width={20}/>
      <Image alt='' className='cursor-pointer w-10' src={assets.googleplus_icon} width={20}/>
      </div>
    </div>
  )
}

export default Footer
