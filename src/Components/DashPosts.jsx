import { Button, Card, Modal, Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { TbFileShredder } from "react-icons/tb";
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { DIVULGE } from "../serverUrl.js"

function DashPosts() {
  const {currentUser}=useSelector((state)=>state.user)
  const [posts, setPosts] = useState([]);
  const [userPosts,setUserPosts]=useState([])
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');
  const [postuserIdToDelete, setPostuserIdToDelete] = useState('');
  const navigate = useNavigate();
  //console.log(userPosts)


  //get all posts only 9 posts willshow becoz we set a query limiter
  useEffect(()=>{
    const fetchUserPosts=async()=>{
      try{
        const res=await fetch(`${DIVULGE}/blog/post/getposts?userId=${currentUser._id}`)
        const data=await res.json()
        if(res.ok){
          setUserPosts(data.posts)
        }
        //console.log(data)
      }catch(error){
        console.log(error.message)
      }
    };
      //fetch all posts
  const fetchPosts = async () => {
        try {
      const res = await fetch(`${DIVULGE}/blog/post/getposts`);
    const data = await res.json();
    if (res.ok) {
       setPosts(data.posts);

          }
      } catch (error) {
     console.log(error.message);
      }
    };
    if(currentUser.isAdmin){
      fetchPosts()
      fetchUserPosts()
    }
  }, [currentUser._id]);


  //showmore function
  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `${DIVULGE}/blog/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //delete user post
  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `${DIVULGE}/blog/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };



    //admin delete post
    const handleDeleteUserPost = async () => {
      setShowModal(false);
      try {
        const res = await fetch(
          `${DIVULGE}/blog/post/deletepost/${postIdToDelete}/${postuserIdToDelete}`,
          {
            method: 'DELETE',
          }
        );
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          setUserPosts((prev) =>
            prev.filter((post) => post._id !== postIdToDelete)
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    };



  return (
    <>
    <div className='px-4 mt-4 '>
    {/* <p className=' text-center lg:text-3xl text-xl font-Montserrat font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-l to-blue-400 from-purple-600 '>All Posts</p> */}
    {currentUser.isAdmin && userPosts.length > 0 ? (
<Card className="max-w-4xl mx-auto bg-gray-100/75 dark:bg-slate-800/50 shadow-lg">
      <div className=" flex items-center justify-between">
        <p className="text-xl font-Montserrat font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-l to-blue-400 from-purple-600">Your Posts</p>

      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-300 dark:divide-gray-700">
        {userPosts.map((post) => (
          <li className="py-3 sm:py-4" >
            <div className="flex items-center space-x-4">
            <Link to={`/post/${post.slug}`}>
              <div className="shrink-0" >
                <img
                  src={post.image}
                  alt={post.title}
                  className="rounded-md w-32"
                  
                />
              </div>
              </Link>
              <div className="min-w-0 flex-1">
              <Link to={`/post/${post.slug}`}>
                <p  className="truncate text-lg font-medium text-purple-900 dark:text-purple-300">{post.title}</p>
                </Link>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400 mb-1">{post.category}</p>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">{new Date(post.updatedAt).toLocaleDateString()}</p>
              </div>
              {/* right */}
              <div className="inline-flex items-center text-base font-semibold">
              <Link
                      className='text-indigo-500 me-5'
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                
                <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                        setPostuserIdToDelete(post.userId);
                      }}
                      className='font-semibold  text-red-500   cursor-pointer'
                    >
                      Delete
                    </span></div>
            </div>
          </li>))}
          
        </ul>
      </div>
    </Card>
    
    ) : (
        <p className='divulge py-12 text-center lg:text-3xl text-xl font-Montserrat font-semibold  mb-4 text-transparent bg-clip-text bg-gradient-to-l to-blue-400 from-purple-600 '>No Posts Yet.</p>
      )}

{/* all posts */}
{currentUser.isMod && posts.length > 0 ? (
<Card className="max-w-4xl mx-auto bg-gray-100/75 dark:bg-slate-800/50 shadow-lg mt-5">
      <div className=" flex items-center justify-between">
        <p className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-l to-blue-400 from-purple-600">All Posts</p>

      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-300 dark:divide-gray-700">
        {posts.map((post) => (
          <li className="py-3 sm:py-4" >
            <div className="flex items-center space-x-4">
            <Link to={`/post/${post.slug}`}>
              <div className="shrink-0" >
                <img
                  src={post.image}
                  alt={post.title}
                  className="rounded-md w-32"
                  
                />
              </div>
              </Link>
              <div className="min-w-0 flex-1">
              <Link to={`/post/${post.slug}`}>
                <p  className="truncate text-lg font-medium text-purple-900 dark:text-purple-300">{post.title}</p>
                </Link>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400 mb-1">{post.category}</p>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">{new Date(post.updatedAt).toLocaleDateString()}</p>
              </div>
              {/* right */}
              <div className="inline-flex items-center text-base font-semibold">
                
                <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className='font-semibold text-red-500   cursor-pointer'
                    >
                      Delete
                    </span></div>
            </div>
          </li>))}
          
        </ul>
      </div>
    </Card>
    
    ) : (
        <p className='divulge py-12 text-center lg:text-3xl text-xl font-Montserrat font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-l to-blue-400 from-purple-600 '> </p>
      )}
                {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full font-Montserrat font-semibold text-indigo-500 dark:text-indigo-500 self-center text-sm py-7'
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
            <TbFileShredder  className='h-16 w-16 text-red-500 dark:text-gray-200 mb-4 mx-auto' />
            <p className='mb-5 text-lg text-gray-100 dark:text-gray-100'>
              Are you sure you want to <span className='text-red-500 font-bold'>delete</span> this post?
            </p>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeletePost}
              className="w-full" >
                Delete
              </Button>
              <Button color='dark' onClick={() => setShowModal(false)}
                className="w-full" >
                Cancel
              </Button>
            </div>
            {/* {currentUser.isMod && (
                <Button color='success' className='w-full mt-3' onClick={handlyeDeleteUserPost}>Delete this users post</Button>
              )} */}
          </div>
        </Modal.Body>
      </Modal>

    </>
  )
}

export default DashPosts