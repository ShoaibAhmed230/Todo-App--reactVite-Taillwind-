import React from 'react';
import '../Components/Navbar.css'
import todoAppLogo from '../Images/todoapp-logo.png'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-700 primary-navy text-white items-center'>
      <div className='logo w-20 h-20'><img src={todoAppLogo} alt="" /></div>
      <ul className='flex gap-8 mx-9 '>
        <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Task</li>
      </ul>
    </nav>
  )
}

export default Navbar
