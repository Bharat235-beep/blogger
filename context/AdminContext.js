import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext=createContext()

export const AdminProvider=(props)=>{
    const [atoken,setAtoken]=useState(null)
    const [users,setUsers]=useState(null);
    const router=useRouter()
    const getUsers=async()=>{
        try {
            const data=(await axios.get('/api/admin')).data
            if(data.success){
                setUsers(data.users)
                console.log(data.users)
            }
            else{
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const logOut=async()=>{
        localStorage.removeItem('blog-app-atoken')
        setAtoken(null)
        router.push('/admin')
    }
    useEffect(()=>{
        if(localStorage.getItem('blog-app-atoken')){
            setAtoken(localStorage.getItem('blog-app-atoken'))
        }
    },[])

    const value={
        atoken,setAtoken,
        users,getUsers,logOut
    }
    return(
        <AdminContext.Provider value={{...value}}>
            {props.children}
        </AdminContext.Provider>
    )
}