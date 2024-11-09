"use client"
import { AdminContext } from '@/context/AdminContext'
import React, { useContext, useEffect } from 'react'

const Subscription = () => {
  const {atoken,users,getUsers}=useContext(AdminContext)
  useEffect(()=>{
    if(atoken){
      getUsers()
    }
  },[atoken])
  return atoken && (
    <div className='mx-2 py-2 flex-1  min-h-[70vh] overflow-y-scroll'>
      <h1 className='text-2xl text-gray-700 font-medium'>Subscriptions</h1>
      <table className='w-full sm:w-[70% ] py-5 mt-5'>
        <thead>
          <tr className='text-base sm:text-xl bg-gray-100 border border-black text-left'>
            <th className='px-2 py-1'>Sr.No.</th>
            <th className='px-2 py-1'>User</th>
            <th className='px-2 py-1'>Email</th>
          </tr>
        </thead>
        <tbody className='text-gray-700'>
          {
           users && users.map((item,index)=>{
              return(
          <tr key={index} className='text-sm sm:text-basehover:bg-slate-50'>
          <td className='px-2 py-1'>{index+1}.</td>
          <td className='px-2 py-1'>{item.name}</td>
          <td className='px-2 py-1'>{item.email}</td>

          </tr>

              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Subscription
