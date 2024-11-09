"use client"
import { AdminContext } from '@/context/AdminContext'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const AdminLogin = () => {
  const {atoken,setAtoken}=useContext(AdminContext)
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const router=useRouter()

    const handleSubmit=async(e)=>{
      e.preventDefault();
      const toastId=toast.loading('Please Wait...')
      try {
        const data=(await axios.post('/api/admin',{email,password})).data
        if(data.success){
            setAtoken(data.token)
            localStorage.setItem('blog-app-atoken',data.token)
            setTimeout(() => {
              router.push('/admin/addBlog')
              
            }, 1000);
            return toast.update(toastId,{isLoading:false,type:'success',render:'Login Successfull',autoClose:4000,closeButton:null})
        }
        else{
            return toast.update(toastId,{isLoading:false,type:'error',render:data.message,autoClose:4000,closeButton:null})
        }
        
      } catch (error) {
        console.log(error)
        return toast.update(toastId,{isLoading:false,type:'error',render:error.message,autoClose:4000,closeButton:null})
      }
    }

    useEffect(()=>{
     if(atoken){
        router.push('/admin/addBlog')
     }
    },[atoken])


  return  !atoken && (
    <form onSubmit={handleSubmit} className='flex justify-center items-center min-h-[80vh] w-[100vw] bg-gray-100'>
      <div className='flex flex-col border gap-1 border-gray-600 rounded-lg bg-gray-100 px-2 py-3 w-64 sm:w-80'>
        <h1 className='text-2xl text-gray-700 font-bold mb-2'> Admin Login</h1>
       
        <p  className='text-gray-600 font-medium'>Email:</p>
        <input value={email} placeholder='admin@gmail.com' onChange={(e)=>setEmail(e.target.value)} type="email" className='border border-gray-600 w-full px-2 py-1 mb-1 rounded'/>
        <p  className='text-gray-600 font-medium'>Password:</p>
        <input value={password} placeholder='admin123' onChange={(e)=>setPassword(e.target.value)} type="password" className='border border-gray-600 w-full px-2 py-1 mb-1 rounded'/>
    
        <button type='submit' className='bg-black text-white mt-1 rounded py-1'>Login</button>
        <p className='text-blue-500 underline cursor-pointer my-1' onClick={()=>router.push('/login')}>Login as user</p>
      </div>
    </form>
  )
}

export default AdminLogin
