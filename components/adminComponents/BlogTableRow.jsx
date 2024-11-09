import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const BlogTableRow = (props) => {
    const {_id,author,authorImg,title,date,deleteBlog}=props
    const blogDate=new Date(date)

  return (
    <tr className='flex flex-wrap items-center justify-between gap-2 sm:table-row py-5 my-1 border-b border-gray-500'>
    <th scope='row' className='flex gap-2 items-center py-2'>
      <Image src={authorImg?authorImg:assets.profile_icon} width={30} height={30} alt='' />
      <p className='text-gray-600'>{author}</p>
    </th>
    <td className='py-2 px-1'>{title?title:'no title'}</td>
    <td className='py-2 px-1 text-sm text-gray-600'>{blogDate.toDateString()} </td>
    <td  className='py-2 cursor-pointer px-2 text-red-700 font-medium' onClick={()=>deleteBlog(_id)}>Delete X </td>
  </tr>
  )
}

export default BlogTableRow
