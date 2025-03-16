import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full flex mt-4 justify-start pl-6'>
      <div className='flex gap-4 flex-row justify-center bg-[#06090f] pl-5 pr-5 pt-2 pb-2 rounded-full border-cyan-700 border-2'>
        <NavLink className={({ isActive }) =>
          isActive
            ? "text-cyan-400 cursor-pointer hover:text-cyan-400"
            : "text-cyan-600 hover:text-cyan-100 cursor-pointer"
        }
          to='/'
        >
          Home
        </NavLink>
        <NavLink className={({ isActive }) =>
          isActive
            ? "text-cyan-400 cursor-pointer hover:text-cyan-400"
            : "text-cyan-600 hover:text-cyan-100 cursor-pointer"
        }
          to='/pastes'
        >
          Pastes
        </NavLink>
      </div>

    </div>
  )
}

export default Navbar