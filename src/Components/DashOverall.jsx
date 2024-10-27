import React, { useEffect, useState } from 'react'
import { FaArrowTrendUp } from "react-icons/fa6";
import { TbUser, TbUserUp } from "react-icons/tb";
import { LiaCommentSolid } from "react-icons/lia";
import { MdPostAdd } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { PiFilePlusFill } from "react-icons/pi";
import { DIVULGE } from "../serverUrl.js"

function DashOverall() {
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);
    const { currentUser } = useSelector((state) => state.user);
    //fetch users
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const res = await fetch(`${DIVULGE}/blog/user/getusers?limit=5`,{credentials: 'include'});
            const data = await res.json();
            if (res.ok) {
              setUsers(data.users);
              setTotalUsers(data.totalUsers);
              setLastMonthUsers(data.lastMonthUsers);
            }
          } catch (error) {
            console.log(error.message);
          }
        };

        //fetch all posts
        const fetchPosts = async () => {
          try {
            const res = await fetch(`${DIVULGE}/blog/post/getposts?limit=5`);
            const data = await res.json();
            if (res.ok) {
              setPosts(data.posts);
              setTotalPosts(data.totalPosts);
              setLastMonthPosts(data.lastMonthPosts);
            }
          } catch (error) {
            console.log(error.message);
          }
        };
        //fetch comments
        const fetchComments = async () => {
          try {
            const res = await fetch(`${DIVULGE}/blog/comment/getcomments?limit=5`,{credentials: 'include'});
            const data = await res.json();
            if (res.ok) {
              setComments(data.comments);
              setTotalComments(data.totalComments);
              setLastMonthComments(data.lastMonthComments);
            }
          } catch (error) {
            console.log(error.message);
          }
        };
        if (currentUser.isAdmin) {
          fetchUsers();
          fetchPosts();
          fetchComments();
        }
      }, [currentUser]);
  return (
    <>
     {/* statistcs */}
       <div className="flex-1 bg-transparent rounded-lg mt-2 p-8 font-Montserrat ">
                    {/* <h4 className="text-xl text-purple-800/75 dark:text-purple-300 font-mono font-bold ">Dashboard</h4> */}
    <div className="flex-1 flex flex-col items-center lg:items-center justify-center px-8 mb-5">
            {/* create post button */}
              {currentUser.isAdmin && (
                <Link to={'/create-post'}>
                <button
                  className="bg-gradient-to-l to-blue-400 via-purple-500 via-50% from-teal-300 mt-2 mb-2 w-44 h-11  flex items-center justify-center text-gray-100  px-3 py-2 rounded-lg font-bold text-sm space-x-2 hover:hover:scale-105  transition duration-300"
                >
                  <span>Create a Post</span>
                  <PiFilePlusFill className='h-6 w-6' />
                </button>
                </Link>
              )}
              </div>
              
                    <div className="grid grid-cols-2 lg:grid-cols-3 md:grid-cols-3 gap-8 mt-4">
                      {/* total users */}
                        <div className="px-6 py-6 bg-gray-100 dark:bg-blue-950/15 border border-gray-400/25 rounded-xl shadow-xl hover:-translate-y-2 delay-50 duration-300">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-sm text-indigo-600">Total Users</span>
                                <span className="text-md bg-gray-200/75 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default"><TbUser className='text-indigo-600'/></span>
                            </div>
                            <div className="flex items-center justify-between mt-6">
                                <div>
                                <div className="flex items-left">
                                        <span className="text-2xl 2xl:text-3xl font-bold">{totalUsers}</span>  
                                    </div>
                                    <div className='flex items-left'>
                                        
                                    <p className='text-gray-700 dark:text-gray-400'>{lastMonthUsers} <span className='px-1'>Last Month</span></p>
                                    <FaArrowTrendUp className='text-green-500'/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* total comments */}
                        <div className="px-6 py-6 bg-gray-100 dark:bg-blue-950/15 border border-gray-400/25 rounded-xl shadow-xl hover:-translate-y-2 delay-50 duration-300">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-sm text-blue-600">Total Comments</span>
                                <span className="text-md bg-gray-200/75 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default"><LiaCommentSolid className='text-blue-600'/></span>
                            </div>
                            <div className="flex items-center justify-between mt-6">
                            <div>
                                <div className="flex items-left">
                                        <span className="text-2xl 2xl:text-3xl font-bold">{totalComments}</span>  
                                    </div>
                                    <div className='flex items-left'>
                                        
                                    <p className='text-gray-700 dark:text-gray-400'>{lastMonthComments} <span className='px-1'>Last Month</span></p>
                                    <FaArrowTrendUp className='text-green-500'/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* total posts */}
                        <div className="px-6 py-6 col-span-2 lg:col-span-1 md:col-span-1 bg-gray-100 dark:bg-blue-950/15 border border-gray-400/25 rounded-xl shadow-xl hover:-translate-y-2 delay-50 duration-300">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-sm text-purple-600">Total Posts</span>
                                <span className="text-md bg-gray-200/75 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default"><MdPostAdd className='text-purple-600'/></span>
                            </div>
                            <div className="flex items-center justify-between mt-6">
                            <div>
                                <div className="flex items-left">
                                        <span className="text-2xl 2xl:text-3xl font-bold">{totalPosts}</span>  
                                    </div>
                                    <div className='flex items-left'>
                                        
                                    <p className='text-gray-700 dark:text-gray-400'>{lastMonthPosts} <span className='px-1'>Last Month</span></p>
                                    <FaArrowTrendUp className='text-green-500'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

{currentUser.isMod && (
    <div className='flex flex-wrap gap-4 p-3 mx-auto justify-center font-Montserrat'>
        {/* recent users */}
        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between  p-3 text-sm font-semibold'>
            <p className='text-center'>Recent users</p>
            <p>
              <Link to={'/dashboard?tab=users'} className='text-purple-600 dark:text-purple-400'>All users</Link>
            </p>
          </div>
          <Table hoverable className='bg-transparent'>
            <Table.Head className='bg-transparent'>

            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700  bg-transparent'>
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt='user'
                        className='w-10 h-10 rounded-full bg-gray-500'
                      />
                    </Table.Cell>
                    <Table.Cell className='text-end'>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between  p-3 text-sm font-semibold'>
            <p className='text-center p-2'>Recent comments</p>
            <p>
              <Link to={'/dashboard?tab=comments'} className='text-purple-600 dark:text-purple-400'>See all comments</Link>
            </p>
          </div>
          <Table hoverable>
            <Table.Head>

            </Table.Head>
            {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700  bg-transparent'>
                    <Table.Cell className='w-96'>
                        <p className='line-clamp-2'>{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between  p-3 text-sm font-semibold'>
            <p className='text-center p-2'>Recent posts</p>
            <p>
              <Link to={'/dashboard?tab=posts'} className='text-purple-600 dark:text-purple-400'>See all posts</Link>
            </p>
          </div>
          <Table hoverable>
            <Table.Head>

            </Table.Head>
            {posts &&
              posts.map((post) => (
                <Table.Body key={post._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 bg-transparent'>
                    <Table.Cell>
                      <img
                        src={post.image}
                        alt='user'
                        className='w-14 h-10 rounded-md bg-gray-500'
                      />
                    </Table.Cell>
                    <Table.Cell className='w-96'>{post.title}</Table.Cell>
                    <Table.Cell className='w-5'>{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>)}

    </>
  )
}

export default DashOverall