import { TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import { DIVULGE } from "../serverUrl.js"
import { PiGearSixFill } from "react-icons/pi";
import { BiLoaderCircle } from 'react-icons/bi';
import { TbLoader } from 'react-icons/tb';

function Projects() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [userPosts,setUserPosts]=useState([])

    //get all posts only 9 posts willshow becoz we set a query limiter
    useEffect(()=>{
      const fetchPosts=async()=>{
        try{
          const res=await fetch(`${DIVULGE}/blog/post/getposts`)
          const data=await res.json()
          if(res.ok){
            setUserPosts(data.posts)
          }
          //console.log(data)
        }catch(error){
          console.log(error.message)
        }
      };
  
        fetchPosts()
    });

        // search
        useEffect(() => {
          const urlParams = new URLSearchParams(location.search);
          const searchTermFromUrl = urlParams.get('searchTerm');
          if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
          }
        }, [location.search]);
    
        const handleSubmit = (e) => {
          e.preventDefault();
          const urlParams = new URLSearchParams(location.search);
          urlParams.set('searchTerm', searchTerm);
          const searchQuery = urlParams.toString();
          navigate(`/search?${searchQuery}`);
        };
  return (
    <>
        <div><p className='text-4xl font-Montserrat font-semibold py-5 text-center justify-center '>
        <span className='text-transparent bg-clip-text bg-gradient-to-l to-blue-300 from-purple-500'>Latest Blogs</span></p></div>
<div class="flex flex-wrap place-items-center font-Montserrat mt-3">
  <section class="relative mx-auto">
        <form onSubmit={handleSubmit} className='w-72'>
  <TextInput
    type='text'
    placeholder='Search...'
    rightIcon={IoSearchOutline}
    className=''
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  </form>
  </section>
</div>


        {/* sample */}
<div className="flex flex-col h-auto bg-transparent items-center mt-5 font-Montserrat">
  <div className="grid gap-4 lg:px-16 px-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">

    {/* cards */}
  {userPosts && userPosts.length > 0 ? (userPosts.map((post) => (
  <div className="relative mx-auto w-full pt-5">
  <Link to={`/post/${post.slug}`} className="relative inline-block w-full transform transition-transform duration-300 ease-in-out">
    <div className="rounded-lg">
      <div className="relative flex h-auto justify-center overflow-hidden rounded-lg">
        <div className="w-full h-40 transform transition-transform duration-500 ease-in-out hover:scale-110">
          <img src={ post.image} alt={ post.title} />
        </div>


        <span className="absolute left-0 top-0 z-10 ml-3 mt-3 inline-flex select-none bg-gray-100 px-2 py-1 text-sm text-slate-900 font-semibold">{post.category}</span>
      </div>

      <div className="">
        <div className="mt-4">
          <div className="flex items-center">
            <div className="relative">
              <p className="line-clamp-1 text-base  font-semibold text-gray-800 dark:text-gray-200 md:text-lg" title="New York">{post.title}</p>
              <p className="mt-1 line-clamp-1 text-sm text-gray-500 dark:text-gray-300"><span className=' font-semibold'>{post.username}</span>	·  {post && (post.content.length / 1000).toFixed(0)} mins read</p>
              <p className=" text-gray-400 dark:text-gray-500 text-xs">{post && new Date(post.createdAt).toLocaleDateString()} </p>
            </div>
          </div>
        </div>

        <p
    className=" block h-40 text-sm text-pretty lg:text-base text-blackfont-light relative group-hover:h-24 leading-[1.2em] duration-500 overflow-hidden text-gray-600 dark:text-gray-400 "
    dangerouslySetInnerHTML={{ __html: post && post.content }} >
    
  </p>

        <div className="mt-4 border-b border-gray-300 dark:border-gray-700 ">

        </div>
      </div>
    </div>
  </Link>
</div>))):(
      <div className='flex justify-center items-center w-screen  min-h-screen '>

      {/* loader custom */}
      <div className="w-full gap-x-2 flex justify-center items-center">
        <p className='text-gray-500'>Try reloading</p>
      <TbLoader    className='w-7 h-7 text-purple-600 animate-spin'/>
      <p className='hidden lg:inline text-transparent'>-----------------</p>
      </div>
      
            </div>
)}

  </div>
</div>
    </>

  )
}

export default Projects