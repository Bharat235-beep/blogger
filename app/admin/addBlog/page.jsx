"use client"
import dynamic from 'next/dynamic'
import React from 'react'

const AddBlog = dynamic(() => import ('./AddBlog'), { ssr: false })

const page = () => {
  return (
    <div>
     
      <AddBlog/>
    </div>
  )
}

export default page
