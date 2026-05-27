// import React from 'react'
import Navbar from './Navbar'
// import { motion} from 'framer-motion'



const Header = () => {
  return (
    <div className='min-h-screen mb-4 flex flex-col items-center justify-center w-full overflow-hidden bg-cover bg-center' style={{backgroundImage: "url('/header_img.jpg')"}} id='Header'>
     <Navbar/>     
      <h2 className='text-5xl inline-block max-w-3xl font-semibold pt-20 text-center'>TLI Calculation</h2>
      <div className='space-x-6 mt-16'>
      </div>
    </div>
  )
}

export default Header