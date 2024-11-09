import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext=createContext()
export const AppProvider=(props)=>{
    const [token,setToken]=useState(null)
    const [user,setUser]=useState(null);
    const [blogs,setBlogs]=useState(null)

    const getUser=async()=>{
        try {
            const data=(await axios.get('/api/user',{headers:{token}})).data
            console.log(data)
            if(data.success){
                setUser(data.user)
                console.log(data.user)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('An Error Occured')
        }
    }
    const getSavedBlogs=async()=>{
        try {
            const data=(await axios.get('/api/user/blogs',{headers:{token}})).data
            console.log(data)
            if(data.success){
                setBlogs(data.savedBlogs)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('An Error Occurred')
        }
    }
    const saveBlog=async(blog)=>{
         const toastId=toast.loading('Saving...')
        try {
            const {_id,title,description,image,author,category,authorImg,date}=blog
             console.log(title,description,image,author,category,authorImg,date)
            const saveBlog={
                userId:user._id,
                blogId:_id,
                title,description,image,
                category,author,authorImg,date
            }
             console.log(saveBlog)
              const data=(await axios.post('/api/user/blogs',saveBlog)).data
              console.log(data)
              if(data.success){
                 return toast.update(toastId,{isLoading:false,type:'success',render:data.message,autoClose:4000,closeButton:null})
              }
              else{
                 return toast.update(toastId,{isLoading:false,type:'error',render:data.message,autoClose:4000,closeButton:null})
              }
        } catch (error) {
            console.log(error)
             return toast.update(toastId,{isLoading:false,type:'error',render:"An Error Occoured",autoClose:4000,closeButton:null})
        }
    }

    const deleteBlog=async(blogId)=>{
        const toastId=toast.loading('Deleting...')
        try {
            const res=await axios.delete('/api/user/blogs',{
                headers:{token},
                params:{
                    id:blogId
                }
            })
            console.log(res)
            if(res.data.success){
                getSavedBlogs()
                return toast.update(toastId,{isLoading:false,type:'success',render:res.data.message,autoClose:4000,closeButton:null})
            }
            else{
                return toast.update(toastId,{isLoading:false,type:'error',render:data.message,autoClose:4000,closeButton:null})
            }
        } catch (error) {
            console.log(error)
            return toast.update(toastId,{isLoading:false,type:'error',render:"An Error Occoured",autoClose:4000,closeButton:null})  
        }
    }
    useEffect(()=>{
        if(localStorage.getItem('blog-token')){
            setToken(localStorage.getItem('blog-token'))
        }
    },[])
    useEffect(()=>{
        if(token){
            getUser()
        }
    },[token])
    const value={token,setToken,
        user,setUser,saveBlog,
        deleteBlog,getSavedBlogs,blogs
    }
    return(
        <AppContext.Provider value={{...value}}>
            {props.children}
        </AppContext.Provider>
    )
}