
import { TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
//import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";
import { DIVULGE } from '../serverUrl.js'
import { TbLoader } from 'react-icons/tb';

function Home() {
  //const {currentUser}=useSelector((state)=>state.user)
  const [userPosts,setUserPosts]=useState([])
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

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
{/* second nav */}
<div className="">
<div className="flex flex-wrap place-items-center font-Montserrat ">
  <section className="relative mx-auto">

    <div className="flex justify-between bg-transparent ">
      <div className=" py-6 flex items-center">
        <p className="flex text-xl lg:text-3xl font-medium mr-3 text-slate-600 dark:text-slate-300">Welcome to
          <span className='text-2xl lg:text-3xl px-2 font-ElsieSwash font-semibold text-transparent bg-clip-text bg-gradient-to-l to-blue-300 from-purple-500'>Divulge.</span> Blog
        </p>
          <div className='hidden lg:inline '>
          <Link to={'/blogs'} className='px-3'>
            Latest Blogs
            </Link>
          <Link to={'/updates'} className='px-5'>
          Guidelines
            </Link>
            <span className='text-2xl'>|</span>
            <Link to={'/about'} className='px-3'>
            Contact 
            </Link>
        </div>
        </div>




        <div className="justify-center items-center py-6 hidden lg:inline">
        <form onSubmit={handleSubmit}>
  <TextInput
    type='text'
    placeholder='Search...'
    rightIcon={IoSearchOutline}
    className=''
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  </form>

      </div>
    </div>
    <div className='flex items-center lg:hidden'>
          <Link to={'/blogs'} className='px-5'>
            Latest Blogs
            </Link>
          <Link to={'/updates'} className='px-3'>
          Guidelines
            </Link>
            <span className='text-2xl'>|</span>
            <Link to={'/about'} className='px-3'>
            Contact 
            </Link>
            <form onSubmit={handleSubmit} className='hidden md:inline'>
  <TextInput
    type='text'
    placeholder='Search...'
    rightIcon={IoSearchOutline}
    className=''
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  </form>
        </div>
  </section>
</div>
</div>




{userPosts && userPosts.length > 0 ? ( 
<div className="mx-auto h-auto flex items-center justify-center lg:px-36 px-5 my-8 " onClick={(e) =>  navigate(`/post/${userPosts[0].slug}`)}>
  <div className="flex flex-col w-full rounded shadow-lg ">
    <div className="w-full h-64 bg-top bg-cover rounded-t">
    <img src={userPosts[0].image} alt={userPosts[0].title} className='h-full w-full object-cover' />
    </div>
    <div className="flex flex-col w-full md:flex-row dark:bg-gray-300">
        <div className="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400/30 rounded md:flex-col md:items-center md:justify-center md:w-1/4">
            <div className="md:text-xl">Latest</div>
            <div className="md:text-3xl">{new Date(userPosts[0].createdAt).toLocaleDateString()}  </div>
        </div>
        <div className="p-4 font-normal text-gray-800 md:w-3/4">
            <p className="py-1 text-4xl font-Montserrat font-semibold leading-none tracking-tight text-gray-800 line-clamp-2">{userPosts[0].title}</p>
            <p className="leading-normal" dangerouslySetInnerHTML={{ __html: userPosts && userPosts[0].content.slice(0, userPosts[0].content.indexOf('.'))}}></p>
            <div className="flex flex-row items-center mt-4 text-gray-700">
                <div className="w-auto bg-slate-900 text-white font-Montserrat p-1">
                {userPosts[0].category}
                </div>
                <div className="w-full flex justify-end text-gray-400">
                {userPosts[0] && (userPosts[0].content.length / 1000).toFixed(0)} mins read
                </div>
            </div>
        </div>
    </div>
</div>
</div>):(
      <div className="grid grid-flow-col grid-cols-8"></div>
    )}

{/* <div><p id='head'>DIVULGE</p></div> */}


{userPosts && userPosts.length > 0 ? ( 
<div className="container mx-auto my-5 lg:hidden md:hidden">
<Link to={`/post/${userPosts[0].slug}`}>
    <div className="relative rounded-lg flex flex-col md:flex-row items-center md:shadow-xl md:h-72 mx-2">
        
        <div className="z-0 order-1 md:order-2 relative w-full md:w-2/5 h-80 md:h-full overflow-hidden rounded-lg md:rounded-none md:rounded-r-lg">
            <div className="absolute inset-0 w-full h-full object-fill object-center bg-blue-400 bg-opacity-30 bg-cover bg-bottom">
            <img
                  src={userPosts[0].image}
                  alt={userPosts[0].title}
                  className="rounded-sm" />
            </div>
            <div className="md:hidden absolute inset-0 h-full p-6 pb-6 flex flex-col-reverse justify-start items-start bg-gradient-to-b from-transparent via-transparent to-gray-900">
                <p className="w-full font-bold text-2xl text-white leading-tight mb-2">{userPosts[0].title}</p>
                <p className="w-full text-xl text-gray-100 leading-tight">{userPosts[0].category}</p>
            </div>

        </div>

        <div className="z-10 order-2 md:order-1 w-full h-full md:w-3/5 flex items-center -mt-6 md:mt-0">
            <div className="p-8 md:pr-18 md:pl-14 md:py-12 mx-2 md:mx-0 h-full bg-white rounded-lg md:rounded-none md:rounded-l-lg shadow-xl md:shadow-none">
                <h4 className="hidden md:block text-xl text-gray-400">{userPosts[0].category}</h4>
                <h3 className="hidden md:block font-bold text-2xl text-gray-700">{userPosts[0].title}</h3>
                <p className="text-gray-600 text-justify" dangerouslySetInnerHTML={{ __html: userPosts[0] && userPosts[0].content.slice(0, userPosts[0].content.indexOf('.')) }}></p>
                <a className="flex items-baseline mt-3 text-blue-600 hover:text-blue-900 focus:text-blue-900" href="">
                    <span>View More</span>
                    <span className="text-xs ml-1">&#x279c;</span>
                </a>
            </div>
        </div>

    </div>
    </Link>
</div>):(

<div className='flex justify-center items-center min-h-screen'>

{/* loader custom */}
<div className="w-full gap-x-2 flex justify-center items-center">
<p className='text-gray-500'>Try reloading</p>
      <TbLoader    className='w-8 h-8 text-purple-600 animate-spin'/>
</div>

      </div>
    )}


{/* cards */}
<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-4 p-4 lg:px-36">

  {/* card */}
{userPosts && userPosts.length > 0 ? ( userPosts.map((post) => (
<div
  className="card shadow-lg lg:h-[20em] h-[15em] max-w-screen-2xl group gap-[0.5em] rounded-xl relative flex justify-end flex-col z-10 overflow-hidden " onClick={(e) =>  navigate(`/post/${post.slug}`)}>
    <img src={ post.image} alt={ post.title} className="absolute align-middle top-0 left-0 w-full h-full rounded-lg object-cover" />
  <div className="absolute align-middle top-0 left-0 h-full w-full group-hover:backdrop-blur-sm bg-gradient-to-b from-transparent via-transparent to-gray-900 group-hover:bg-gray-900/40"></div>


  <div
    className="container text-white z-10  font-Montserrat flex flex-col gap-1"
  >
    
    <div className="h-fit w-full">
      {/* category tag */}
    <div className="flex justify-center items-center h-fit w-fit gap-1">
      <div className="  text-black font-semibold text-sm p-1 bg-gray-100 duration-300 cursor-pointer">
        <p>{post.category}</p>
      </div>
    </div>
      
    <p className="card_heading lg:text-xl px-1 font-semibold text-md text-gray-100 line-clamp-2">
        {post.title}
      </p>
      {/* <p className="text-sm text-gray-200">
        {post.username}
      </p> */}
    </div>

    {/* <div className="flex justify-left items-center h-fit w-full gap-2">
      <div className="w-fit h-fit text-gray-300  text-xs font-light">
        <p>{post && new Date(post.createdAt).toLocaleDateString()}</p>
        
      </div>
    </div> */}
  </div>
  <p
    className=" block px-3 text-sm text-pretty lg:text-base text-blackfont-light relative h-[0em] group-hover:h-24 leading-[1.2em] duration-500 overflow-hidden text-gray-300 "
    dangerouslySetInnerHTML={{ __html: post && post.content }} >
    
  </p>
</div>
))):(
  <>
{/* loading card */}
<div className="hidden lg:block md:block">
</div>
</>


)}
</div>


</>
  )
}

export default Home