// import {useEffect, useState} from 'react'
import {assets} from '../assets/assets'
const Navbar = () => {
   

    

  return (
    <div className='absolute top-0 left-0 w-full z-10' >
        <div className='container mx-auto max-w-7xl flex justify-between items-center py-4 px-6 md:px-20 lg:px-32  bg-transparent'>
            <img src={assets.logo} alt="" />
            <ul className='hidden md:flex gap-7 text-white'>
                <a className='cursor-pointer hover:text-gray-400 hover:underline'>Home</a>    
                <a className='cursor-pointer hover:text-gray-400 hover:underline'>LifeStack</a>
                <a className='cursor-pointer hover:text-gray-400 hover:underline'>Wind Rhytm</a>
            </ul>
          {/* <button href="#Contact" className='hidden md:block bg-white px-8 py-2 rounded-xl hover:bg-blue-400'>Sign Up</button> */}
          <div className=''>
        <a className= 'hidden md:block bg-white px-8 py-2 rounded-xl hover:bg-blue-400'>Sign Up</a>
          </div>
          {/* <img src={assets.menu_icon} className='md:hidden w-7 cursor-pointer' alt=""/> */}
        </div>

        {/* ----mobile-menu---- */}
        <div>
          <div className='flex items-center justify-end p-6 cursor-pointer'>
              {/* <img src={assets.cross_icon} className='w-6' alt="Close menu" /> */}
            </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            
            <a className='px-4 py-2 rounded-full inline-block'>Home</a>
            <a className='px-4 py-2 rounded-full inline-block'>LifeStack</a>
            <a className='px-4 py-2 rounded-full inline-block'>Wind Rhytm</a>
           
          </ul>
        </div>
    </div>
  )
}

export default Navbar