"use client"

import BlogList from "@/components/BlogList";
import Header from "@/components/Header";
import { AppProvider } from "@/context/AppContext";

export default function Home() {

  return (
    <>
  <AppProvider>
    <Header/>
    <BlogList/>
    </AppProvider>
         </>
  );
}
