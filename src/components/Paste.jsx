import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Calendar, Copy, Eye, PencilLine, Trash2, Share2, X } from "lucide-react";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');

  const filterData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  // function handleShare(pasteId) {
  //   const pasteLink = `${window.location.origin}/pastes/${pasteId}`;
  //   navigator.clipboard.writeText(pasteLink).then(() => {
  //     toast.success('Link copied to clipboard!');
  //   }).catch(() => {
  //     toast.error('Failed to copy the link.');
  //   });
  // }


  function handleShare(pasteId) {
    const pasteLink = `${window.location.origin}/pastes/${pasteId}`;
    navigator.clipboard.writeText(pasteLink).then(() => {
      toast.custom((t) => (
        <div className={`bg-gray-900 text-white p-3 rounded-lg flex justify-between items-center gap-4 ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
          <span>Link copied to clipboard!</span>
          <button onClick={() => toast.dismiss(t.id)}>
            <X className="text-gray-400 hover:text-white" size={18} />
          </button>
        </div>
      ));
    }).catch(() => {
      toast.custom((t) => (
        <div className={`bg-red-600 text-white p-3 rounded-lg flex justify-between items-center gap-4 ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
          <span>Failed to copy the link.</span>
          <button onClick={() => toast.dismiss(t.id)}>
            <X className="text-gray-200 hover:text-white" size={18} />
          </button>
        </div>
      ));
    });
  }

  function handleCopy(pasteContent) {
    navigator.clipboard.writeText(pasteContent);
    toast.custom((t) => (
      <div className="bg-gray-900 text-white p-3 rounded-lg flex justify-between items-center gap-4">
        <span>Copied to clipboard</span>
        <button onClick={() => toast.dismiss(t.id)}>
          <X className="text-gray-400 hover:text-white" size={18} />
        </button>
      </div>
    ));
  }

  function convertTime(isoDate) {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(new Date(isoDate));
    return formattedDate;
  }


  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0 text-cyan-50">
      <input
        className='rounded-xl p-2 pl-4 w-full bg-[#111b2e] text-cyan-50 border-cyan-700 border-2 focus:outline-none focus:border-cyan-400 font-semibold font-poppins mb-4'
        type='search'
        placeholder='Search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Load pastes */}
      <div className='flex flex-col-reverse gap-4'>
        {filterData.length > 0 ? (
          filterData.map((paste) => (
            <div
              key={paste._id}
              className='rounded-xl p-2 pl-4 w-full bg-[#111b2e] border-cyan-700 border-2 flex justify-between'
            >
              {/* Title, content, date */}
              <div className='flex mr-5'>
                <div className="flex flex-col items-center mr-4 mt-0.5">
                  <button>
                    <Link to={`/pastes/${paste?._id}`}>
                      <Eye className="text-cyan-50 hover:text-amber-500" size={20} />
                    </Link>
                  </button>
                </div>
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="font-bold">{paste.title}</div>
                    <div className="text-gray-300 content-preview">{paste.content}</div>
                  </div>
                  <div className="flex items-center mt-2 text-gray-400 text-sm">
                    <Calendar className="mr-1" size={20} />
                    {convertTime(paste.createdAt)}
                  </div>
                </div>
              </div>
              {/* Icons */}
              <div className='place-content-evenly flex flex-col mr-2 gap-2'>
                <button>
                  <Link to={`/?pasteId=${paste?._id}`}>
                    <PencilLine className="text-cyan-50 hover:text-blue-500" size={20} />
                  </Link>
                </button>
                <button onClick={() => handleDelete(paste?._id)}>
                  <Trash2 className="text-cyan-50 hover:text-red-500" size={20} />
                </button>
                <button onClick={() => {
                  navigator.clipboard.writeText(paste?.content);
                  toast.success('Copied to clipboard');
                }}>
                  <Copy className="text-cyan-50 hover:text-green-500" size={20} />
                </button>
                <button onClick={() => handleShare(paste?._id)}>
                  <Share2 className='text-cyan-50 hover:text-pink-500' size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 mt-10">
            No pastes available. Create a new one!
          </div>
        )}
      </div>
    </div>

  )
}

export default Paste