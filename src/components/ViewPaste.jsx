import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const ViewPaste = () => {
  const { id } = useParams()
  const allPaste = useSelector((state) => state.paste.pastes)
  const paste = allPaste.filter((p) => p._id === id)[0]

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <div className='flex flex-row gap-2 place-content-between max-h-full w-4/5 '>
        <input className='rounded-xl p-2 pl-4 w-full bg-[#111b2e] text-cyan-50 border-cyan-700 border-2 focus:outline-none focus:border-cyan-400 font-semibold font-poppins'
          value={paste.title}
          disabled
          placeholder='Enter title'
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(paste.content)
            toast.success('Copied to clipboard')
          }}
          className='rounded-xl p-2 bg-[#111b2e] text-cyan-50 hover:bg-[#0f1726] hover:text-cyan-500 border-cyan-700 border-2 hover:border-cyan-400'>
          Copy
        </button>
      </div>
      <div className='w-full flex flex-col items-center justify-center mt-4'>
        <textarea className='rounded-xl p-4 bg-[#111b2e] text-cyan-50 w-4/5 border-cyan-700 border-2 focus:outline-none focus:border-cyan-400'
          value={paste.content}
          disabled
          placeholder='Enter content here'
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default ViewPaste

