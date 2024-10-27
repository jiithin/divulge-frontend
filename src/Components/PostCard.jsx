import { Card } from 'flowbite-react';
import React from 'react'
import { Link } from 'react-router-dom';

function PostCard({ post }) {
  return (
    <>
       

  {/* <Link to={`/post/${post.slug}`}>
<div
className="card shadow-lg lg:h-[15em] h-[15em] max-w-screen-xl group gap-[0.5em] rounded-xl relative flex justify-end flex-col z-10 overflow-hidden ">
  <img src={ post.image} alt={ post.title} className="absolute align-middle top-0 left-0 w-full h-full rounded-lg object-cover" />
<div className="absolute align-middle top-0 left-0 h-full w-full"></div>


<div
  className="container text-white z-10  font-Montserrat flex flex-col gap-1"
>
  
  <div className="h-fit w-full"> */}
    {/* category tag */}
  {/* <div className="flex justify-center items-center h-fit w-fit gap-1">
    <div className="  text-black font-semibold text-sm font-normal p-1 bg-gray-100 duration-300 cursor-pointer">
      <p>{post.category}</p>
    </div>
  </div>
    
  <p className="card_heading lg:text-xl px-1 font-semibold text-md text-gray-100 bg-gradient-to-t from-gray-800/10 via-gray-800/40 to-gray-800/10 backdrop-blur-sm">
      {post.title.slice(0,80)}...
    </p>

  </div>


</div>

</div>
</Link> */}



<div className="max-w-4xl bg-tranparent border-b border-gray-300 dark:border-gray-700">

        <Link to={`/post/${post.slug}`}>
          <div className="py-3 sm:py-4 " >
            <div className="flex items-center space-x-4 ">

           {/* text */}
            <div className="min-w-0 flex-1">
                <p className="truncate text-lg font-semibold text-purple-900 dark:text-purple-300 line-clamp-2">{post.title}</p>
                <p className="post-content hidden lg:inline md:inline text-slate-950 dark:text-gray-400 pb-2 text-pretty" dangerouslySetInnerHTML={{ __html: post && post.content.slice(0, post.content.indexOf('.')) }}></p>
                <p className="post-content lg:hidden md:hidden text-slate-950 dark:text-gray-400 pb-2 text-pretty" dangerouslySetInnerHTML={{ __html: post && post.content.slice(0, 70) }}></p>
                <div className="shrink-0 flex">
                <img
                  alt={post.username}
                  src={post.userProfile}
                  className="rounded-full h-7 w-7"
                />
                <div className="flex flex-col ml-2">
                <p className="font-semibold text-slate-950 dark:text-gray-200  text-sm">{post.username}</p>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400 mb-1">{post.category} · {post && (post.content.length / 1000).toFixed(0)} mins read</p>
                </div>
                </div>
              </div>

             {/* image */}
              <div className="shrink-0" >
                <img
                  src={post.image}
                  alt={post.title}
                  className="rounded-sm lg:w-52 md:w-44 w-36 object-cover" />
              </div>

            </div>
          </div>
          </Link>
    </div>

</>
  )
}

export default PostCard