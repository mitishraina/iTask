import React from 'react'
import { IoHome } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";

const navbar = () => {
  return (
    <nav className='flex justify-between bg-black text-white py-2'>
        <div className="logo">
            <span className='font-bold text-5xl mx-12 cursor-pointer'>iTask</span>
        </div>
      <ul className="flex gap-11 mx-12 items-center">
        <li className='cursor-pointer'><IoHome className='text-2xl'/></li>
        <li className='cursor-pointer'><FaTasks className='text-2xl'/></li>
      </ul>
    </nav>
  )
}

export default navbar
