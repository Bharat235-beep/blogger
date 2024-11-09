import { assets, blog_data } from '@/assets/assets'
import { AppContext } from '@/context/AppContext'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'

const BlogItem = (props) => {

    const {_id,title,image,description,category,type,blogId}=props
    const {saveBlog,deleteBlog}=useContext(AppContext)
  
  return (
    <div className='w-[290px] border border-black m-2 hover:shadow-[-7px_7px_0px]'>
      <div>
        <Image src={image} alt=' ' width={300} height={300}/>
        <p className='bg-black text-white inline-block px-3 my-2 ml-2'>{category}</p>
      </div>
      <div className='px-3 flex flex-col gap-3 mt-2'>
        <h5 className='text-lg font-medium text-gray-900'>{title}</h5>
        <p className='text-gray-600'>{description.slice(0,100)}...</p>
      </div>
      <div className='flex justify-between items-center px-3'>
      <Link href={`blogs/${type==='Save'?_id:blogId}`}>
      <button className='flex gap-1 text-gray-900 font-medium items-center justify-center my-2'>Read more <Image alt='' src={assets.arrow} width={12}/></button>
      </Link>
      {type==='Save' ?<button type='button' className='text-green-600 font-medium bg-green-50 px-1 rounded' onClick={()=>saveBlog({...props})}>Save</button>
      :
      <button type='button' className='text-red-600 font-medium bg-red-50 px-1 rounded' onClick={()=>deleteBlog(_id)}>Delete</button>
      }
      </div>
    </div>
  )
}

export default BlogItem
