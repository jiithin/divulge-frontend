import React from 'react'
import { Modal, Button, Card } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaUserAltSlash } from "react-icons/fa";
import { DIVULGE } from "../serverUrl.js"

function DashUsers() {
    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState('');

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const res = await fetch(`${DIVULGE}/blog/user/getusers`,{credentials: 'include'});
          const data = await res.json();
          if (res.ok) {
            setUsers(data.users);
            if (data.users.length < 9) {
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      if (currentUser.isMod) {
        fetchUsers();
      }
    }, [currentUser._id]);
  
    const handleShowMore = async () => {
      const startIndex = users.length;
      try {
        const res = await fetch(`${DIVULGE}/blog/user/getusers?startIndex=${startIndex}`,{credentials: 'include'});
        const data = await res.json();
        if (res.ok) {
          setUsers((prev) => [...prev, ...data.users]);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  
    const handleDeleteUser = async () => {
      try {
          const res = await fetch(`${DIVULGE}blog/user/delete/${userIdToDelete}`, {
              method: 'DELETE',
              credentials: 'include',
          });
          const data = await res.json();
          if (res.ok) {
              setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
              setShowModal(false);
          } else {
              console.log(data.message);
          }
      } catch (error) {
          console.log(error.message);
      }
    };
  
    return (
        <>
        <div className='px-4 mb-11'>
        {currentUser.isAdmin && users.length > 0 ? (
        <Card className="max-w-3xl mx-auto bg-gray-100/75 dark:bg-slate-800/50 shadow-lg mt-5">
      <div className=" flex items-center justify-between">
        <h5 className="text-xl font-Montserrat font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-l to-blue-400 from-purple-600">All Users</h5>
        {showMore && (
        <button onClick={handleShowMore} className="text-sm font-medium text-indigo-600 dark:text-indigo-500">
          View all
        </button>
        )}
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-300 dark:divide-gray-700">
        {users.map((user) => (
          <li className="py-3 sm:py-4" key={user._id}>
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <img
                  alt={user.username}
                  src={user.profilePicture}
                  className="rounded-full h-11 w-11"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-md font-medium text-gray-900 dark:text-white">{user.username} {user.isMod && (
                <span className='text-green-500 font-bold text-xs ml-2' >Admin</span>
                      )}</p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">{user.email}</p>

                 <p className="truncate text-xs text-gray-500 dark:text-gray-400">Joined : {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
              
              <div className="flex-col items-end ">

                <span
                        onClick={() => {
                          setShowModal(true);
                          setUserIdToDelete(user._id);
                        }}
                        className='font-medium text-red-500 cursor-pointer mr-2'
                      >
                        Remove
                      </span>
                </div>
            </div>
          </li>))}
         
        </ul>
      </div>
    </Card>
        ) : (
          <p className='divulge text-center py-12 lg:text-3xl text-xl font-Montserrat font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-l to-blue-400 from-purple-600 '>No users to find.</p>
        )}

         {showMore && (
              <button
                onClick={handleShowMore}
                className='w-full text-purple-500 self-center text-sm py-7'
              >
                Show more
              </button>
            )}
      </div>
      
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size='md'
          className="bg-transparent backdrop-blur-sm "
        >
          <Modal.Header className="bg-slate-500 rounded-t-md " />
          <Modal.Body className="bg-slate-500 rounded-b-md " >
            <div className='text-center'>
              <FaUserAltSlash  className='h-16 w-16 text-red-500 dark:text-red-700 mb-4 mx-auto' />
              <p className='mb-5 text-lg text-gray-100 dark:text-gray-400'>
                Are you sure you want to <span className='text-red-500 font-bold'>Remove</span> this User?
              </p>
              <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={handleDeleteUser} 
                className='w-full' >
                  Delete
                </Button>
                <Button color='dark' onClick={() => setShowModal(false)}
                    className='w-full' >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

      </>
  )
}

export default DashUsers