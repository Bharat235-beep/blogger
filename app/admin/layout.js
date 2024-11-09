"use client"
import Navbar from "@/components/adminComponents/Navbar";
import Sidebar from "@/components/adminComponents/Sidebar";
import { AdminProvider } from "@/context/AdminContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({children}){
    
    return(
        <>  
        <AdminProvider>
        <Navbar/>
        <ToastContainer/>
        <div className="flex">
          <Sidebar/>
        {children}
        </div>
        </AdminProvider>
        </>
    )
}