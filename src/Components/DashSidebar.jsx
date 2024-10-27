import React, { useState } from 'react'

import {  HiChartPie, HiUser } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import { IoMdListBox } from "react-icons/io";
import { PiPowerBold } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoExit  } from "react-icons/io5";
import { BiSolidCommentError } from "react-icons/bi";

import { signoutSuccess } from '../redux/user/userSlice';
import { DIVULGE } from "../serverUrl.js"



function DashSidebar() {
    const {currentUser} = useSelector((state) => state.user);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch=useDispatch();


     // signout
     const handleSignout = async () => {
      try {
        const res = await fetch(`${DIVULGE}/blog/user/signout`, {
          method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signoutSuccess());
          navigate('/');
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    

    
  return (
    <>
   



{/* large devices */}
<div className="fixed top-56 right-5 h-auto z-20  lg:block md:block hidden card w-auto bg-gray-200 dark:bg-gray-900/40  p-5 shadow-md border border-gray-500/25 backdrop-blur-xl rounded-2xl">


      <Link to='/dashboard?tab=stats'
        className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-t-lg bg-cover dark:text-purple-300 hover:bg-gray-100 dark:hover:bg-gray-600/25   text-gray-600 transition-all ease-linear"
        >
     <HiChartPie className='text-purple-700 dark:text-indigo-300 mt-1'/>
        Dashboard
      </Link>

      <Link to='/dashboard?tab=profile'
        className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-sm bg-cover dark:text-purple-300 hover:bg-gray-100 dark:hover:bg-gray-600/25  text-gray-600 transition-all ease-linear"
      >
      <HiUser className='text-purple-700 dark:text-indigo-300 mt-1'/>
        Profile
      </Link>

      {/* is admin posts */}
      {currentUser.isAdmin ? (
      <Link to='/dashboard?tab=posts'
      className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-sm bg-cover dark:text-purple-300 hover:bg-gray-100 dark:hover:bg-gray-600/25   text-gray-600 transition-all ease-linear"
      >
      <IoMdListBox className='text-purple-700 dark:text-indigo-300 mt-1'/>
        Your Posts
      </Link>):(
        <Link to='/projects'
        className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-sm bg-cover dark:text-purple-300 hover:bg-gray-100 dark:hover:bg-gray-600/25   text-gray-600 transition-all ease-linear"
      >
      <IoMdListBox className='text-purple-700 dark:text-indigo-300 mt-1'/>
        Posts
      </Link>
      )}

            {/* is admin users */}
            {currentUser.isMod && (
              <>
                   <Link to='/dashboard?tab=users'
      className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-sm bg-cover dark:text-purple-300 hover:bg-gray-100 dark:hover:bg-gray-600/25   text-gray-600 transition-all ease-linear"
      >
      <FaUsers className='text-purple-700 dark:text-indigo-300 mt-1'/>
        Users
      </Link>
      <Link to='/dashboard?tab=comments'
      className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-sm bg-cover dark:text-purple-300 hover:bg-gray-100 dark:hover:bg-gray-600/25   text-gray-600 transition-all ease-linear"
      >
      <BiSolidCommentError className='text-purple-700 dark:text-indigo-300 mt-1'/>
        Comments
      </Link>
              </>
 

    )}

      <Link
      onClick={handleSignout}
      className="p-16-semibold flex size-full gap-4 p-4 group font-semibold rounded-b-lg bg-cover dark:text-red-500 hover:bg-red-500/25 dark:hover:bg-red-600/25   text-red-600 transition-all ease-linear"
      >
          <PiPowerBold className='text-red-600 dark:text-red-500 mt-1'/>  
        Sign Out
      </Link>

</div>



{/* small devices */}
<div className="flex justify-center w-full">
<div
  className="flex items-center justify-between fixed bottom-9   h-auto w-auto z-20 lg:hidden md:hidden bg-gray-200/75 dark:bg-gray-900/40 backdrop-blur-xl rounded-full px-2 py-2 shadow-lg max-w-md mx-auto transition-all duration-300 hover:shadow-xl hover:bg-opacity-90 border border-gray-400/25"
>
  <Link to='/dashboard?tab=stats'
    className="text-red-500 hover:text-red-600 mx-2 transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full"
  >
     <HiChartPie className='h-6 w-6 text-gray-500 dark:text-indigo-300'/>
  </Link>
  <Link to='/dashboard?tab=profile'
    className="text-gray-600 hover:text-gray-800 mx-3 transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full"
  >
        <HiUser className='h-6 w-6 text-gray-500 dark:text-indigo-300'/>
  </Link>
  {/* is admin posts */}
  {currentUser.isAdmin ? (
  <Link to='/dashboard?tab=posts'
    className="text-gray-600 hover:text-gray-800 mx-3 transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full"
  >
        <IoMdListBox className='h-6 w-6 text-gray-500 dark:text-indigo-300'/>
  </Link>):(
  <Link to='/projects'
    className="text-gray-600 hover:text-gray-800 mx-3 transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full"
  >
        <IoMdListBox className='h-7 w-7 text-gray-500 dark:text-indigo-300'/>
  </Link>)}


    {/* is admin users */}
    {currentUser.isMod && (
      <>
  <Link to='/dashboard?tab=users'
    className="text-gray-600 hover:text-gray-800 mx-3 transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full"
  >
        <FaUsers className='h-6 w-6 text-gray-500 dark:text-indigo-300'/>
  </Link>
    <Link to='/dashboard?tab=comments'
    className="text-gray-600 hover:text-gray-800 mx-3 transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full"
  >
        <BiSolidCommentError className='h-6 w-6 text-gray-500 dark:text-indigo-300'/>
  </Link>
</>
)}


  
  <Link
  onClick={handleSignout}
    className="text-gray-600 hover:text-gray-800 mx-2 transition-transform duration-200 ease-in-out hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full"
  >
          <IoExit  className='h-6 w-6 text-red-500 '/>
  </Link>
 </div>
</div>
</>
  )
}


export default DashSidebar