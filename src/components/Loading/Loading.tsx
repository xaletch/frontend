import React from 'react'
import link_img from '../../img/link_img'

export const Loading = () => {
  return (
    <div className='p-5 h-screen flex items-center justify-center'>
        <img className='w-16 h-16 select-none' src={link_img.loading} alt=''/>
    </div>
  )
}
