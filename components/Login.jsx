"use client"
import { AppContext } from '@/context/AppContext'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Login = () => {
  const {token,setToken}=useContext(AppContext)
    const [currState,setCurrState]=useState('Login')
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const router=useRouter()

    const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
        const toastId=toast.loading('Please wait...')
        if(currState==='Signup'){
          const res=await axios.post('/api/user',{name,email,password})
          console.log(res)
          if(res.data.success){
            setToken(res.data.token)
            localStorage.setItem('blog-token',res.data.token)
            router.push('/')
            return toast.update(toastId,{isLoading:false,type:'success',render:'Account Created',autoClose:4000,closeButton:null})
           
          }
          else{        
            return toast.update(toastId,{isLoading:false,type:'error',render:res.data.message,autoClose:4000,closeButton:null})
          }
        }
        else{
          const res=await axios.post('/api/user/login',{email,password})
          console.log(res)
          if(res.data.success){
            setToken(res.data.token)
            localStorage.setItem('blog-token',res.data.token)
             setTimeout(() => {
              
              router.push('/')
            }, (1000));
            return toast.update(toastId,{isLoading:false,type:'success',render:'Login Successfull',autoClose:4000,closeButton:null})
           
          }
          else{        
            return toast.update(toastId,{isLoading:false,type:'error',render:res.data.message,autoClose:4000,closeButton:null})
          }
        }
        
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }

    useEffect(()=>{
      if(token){
        console.log(token)
      }
    },[token])


  return !token && (
    <form onSubmit={handleSubmit} className='flex flex-col gap-5 justify-center items-center min-h-[80vh] w-full'>
      <div className='flex flex-col border gap-1 border-gray-600 rounded-lg bg-gray-100 px-2 py-3 w-64 sm:w-80'>
        <h1 className='text-2xl text-gray-700 font-bold mb-2'> {currState}</h1>
        {currState!=='Login' && <p className='text-gray-600 font-medium'>Name:</p>}
       {currState!=='Login' && <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className='border border-gray-600 w-full px-2 py-1 mb-1 rounded'/>}
        <p  className='text-gray-600 font-medium'>Email:</p>
        <input value={email} placeholder='bharat1@demo.com' onChange={(e)=>setEmail(e.target.value)} type="email" className='border border-gray-600 w-full px-2 py-1 mb-1 rounded'/>
        <p  className='text-gray-600 font-medium'>Password:</p>
        <input value={password} placeholder='12345' onChange={(e)=>setPassword(e.target.value)} type="password" className='border border-gray-600 w-full px-2 py-1 mb-1 rounded'/>
        {
            currState==='Signup'?
            <button type='submit' className='bg-black text-white mt-1 rounded py-1'>Create Account</button>
            :
            <button type='submit' className='bg-black text-white mt-1 rounded py-1'>Login</button>
        }
        {
            currState==='Signup'?
            <p onClick={()=>setCurrState("Login")} className='text-blue-700 font-medium cursor-pointer underline'>Login to your account</p>
            :
            <p onClick={()=>setCurrState("Signup")} className='text-blue-700 font-medium cursor-pointer underline'>Create account</p>
          }
        
      </div>
          <p onClick={()=>router.push("/admin")} className='text-blue-700 font-medium cursor-pointer underline'>Login as admin?</p>
    </form>
  )
}

export default Login
