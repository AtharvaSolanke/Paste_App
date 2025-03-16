import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams()
  const pasteId = searchParams.get('pasteId')
  const dispatch = useDispatch();
  const allPaste = useSelector((state) => state.paste.pastes)

  useEffect(() => {
    if (pasteId) {
      const paste = allPaste.find((p) => p._id === pasteId)
      setTitle(paste.title)
      setValue(paste.content)
    }
  }, [pasteId])

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(15),
      createdAt: new Date().toISOString(),
    }

    if (pasteId) {
      //update
      dispatch(updateToPastes(paste))
    }
    else {
      //create
      dispatch(addToPastes(paste))
    }

    // clean after add or update
    setTitle('')
    setValue('')
    setSearchParams({})
  }

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <div className='flex flex-row gap-2 place-content-between max-h-full w-4/5'>
        <input className='rounded-xl p-2 pl-4 w-full bg-[#111b2e] text-cyan-50 border-cyan-700 border-2 focus:outline-none focus:border-cyan-400 font-semibold font-poppins'
          value={title}
          placeholder='Enter title'
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createPaste}
          className='rounded-xl p-2 bg-[#111b2e] text-cyan-50 hover:bg-[#0f1726] hover:text-cyan-500 border-cyan-700 border-2 hover:border-cyan-400'>
          {
            pasteId ? 'Update' : 'Create'
          }
        </button>
      </div>
      <div className='w-4/5 mt-4'>
        <textarea className='rounded-xl min-w-full p-4 bg-[#111b2e] text-cyan-50 w-4/5 border-cyan-700 border-2 focus:outline-none focus:border-cyan-400'
          value={value}
          placeholder='Enter content here'
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default Home