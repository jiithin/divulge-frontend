import React from 'react'
import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../Components/PostCard';
import { IoSearchOutline } from "react-icons/io5";
import { DIVULGE } from "../serverUrl.js"

function Search() {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'uncategorized',
      });
    
      console.log(sidebarData);
      const [posts, setPosts] = useState([]);
      const [loading, setLoading] = useState(false);
      const [showMore, setShowMore] = useState(false);
      const [searchTerm, setSearchTerm] = useState('');
      const location = useLocation();
    
      const navigate = useNavigate();
    
      useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category');
        if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
          setSidebarData({
            ...sidebarData,
            searchTerm: searchTermFromUrl,
            sort: sortFromUrl,
            category: categoryFromUrl,
          });
        }
    
        const fetchPosts = async () => {
          setLoading(true);
          const searchQuery = urlParams.toString();
          const res = await fetch(`${DIVULGE}/blog/post/getposts?${searchQuery}`);
          if (!res.ok) {
            setLoading(false);
            return;
          }
          if (res.ok) {
            const data = await res.json();
            setPosts(data.posts);
            setLoading(false);
            if (data.posts.length === 9) {
              setShowMore(true);
            } else {
              setShowMore(false);
            }
          }
        };
        fetchPosts();
      }, [location.search]);
    
      const handleChange = (e) => {
        if (e.target.id === 'searchTerm') {
          setSidebarData({ ...sidebarData, searchTerm: e.target.value });
        }
        if (e.target.id === 'sort') {
          const order = e.target.value || 'desc';
          setSidebarData({ ...sidebarData, sort: order });
        }
        if (e.target.id === 'category') {
          const category = e.target.value || 'uncategorized';
          setSidebarData({ ...sidebarData, category });
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('category', sidebarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
      };
    
      const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`${DIVULGE}/blog/post/getposts?${searchQuery}`);
        if (!res.ok) {
          return;
        }
        if (res.ok) {
          const data = await res.json();
          setPosts([...posts, ...data.posts]);
          if (data.posts.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
      };
              // search
              useEffect(() => {
                const urlParams = new URLSearchParams(location.search);
                const searchTermFromUrl = urlParams.get('searchTerm');
                if (searchTermFromUrl) {
                  setSearchTerm(searchTermFromUrl);
                }
              }, [location.search]);
          
              const handleSearch = (e) => {
                e.preventDefault();
                const urlParams = new URLSearchParams(location.search);
                urlParams.set('searchTerm', searchTerm);
                const searchQuery = urlParams.toString();
                navigate(`/search?${searchQuery}`);
              };
  return (
    <div className='flex flex-col h-auto  items-center justify-center font-Montserrat'>

      <div className='mb-32'>
        <div className='flex '>

        <div className="hidden lg:inline md:inline py-3">
<div class="flex flex-wrap place-items-center font-Montserrat mt-4">
  <section class="relative mx-auto">
        <form onSubmit={handleSearch} className='w-72'>
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
</div>
        <p className='text-2xl font-semibold text-slate-600 dark:text-slate-300 p-3 mt-5 '>
          Search results for "<span className='text-transparent bg-clip-text bg-gradient-to-l to-blue-400 from-purple-500 dark:text-blue-400'>
          {sidebarData.searchTerm}</span>"
        </p>
        </div>
        
        <form className=' gap-8 border-b border-gray-300 dark:border-gray-600' onSubmit={handleSubmit}>
        <div className='flex p-3 items-center gap-2'>
            <label className='font-semibold'>Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id='category'
            >
              <option value='uncategorized'>Uncategorized</option>
              <option value='Technology'>Technology</option>
              <option value='Travel'>Travel</option>
              <option value='Food'>Food</option>
              <option value='Fashion'>Fashion</option>
              <option value='Sports'>Sports</option>
              <option value='Fitness'>Fitness</option>
              <option value='Eduction'>Eduction</option>
            </Select>
            <button type='submit' className='font-Montserrat font-semibold px-3 text-purple-400 hover:-translate-y-1 hover:scale-105 transition duration-300'>
            Apply
          </button>
          </div>
          </form>


        <div className=' mt-5 justify-center grid grid-cols-1  gap-4 p-4'>
          {!loading && posts.length === 0 && (
            <p className='text-xl text-gray-500 font-Montserrat text-center'>No posts found.</p>
          )}
          {loading && <p className='text-xl text-gray-500 text-center'>Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className='text-indigo-600 dark:text-indigo-500 text-lg p-7 w-full'
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search