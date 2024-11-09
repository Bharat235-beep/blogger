"use client"
import Login from '@/components/Login'
import { AppProvider } from '@/context/AppContext'
import React from 'react'

const page = () => {
  return (
    <>
    <AppProvider>
      <Login/>
      </AppProvider>
    </>
  )
}

export default page
