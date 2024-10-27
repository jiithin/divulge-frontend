import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import DashSidebar from '../Components/DashSidebar';
import DashProfile from '../Components/DashProfile';
import DashPosts from '../Components/DashPosts';
import DashUsers from '../Components/DashUsers';
import DashComments from '../Components/DashComments';
import DashOverall from '../Components/DashOverall';

function Dashboard() {
  //to get each tab copmonent from click
  const location = useLocation();
  const [tab,setTab]=useState('');
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get('tab');
    if (tabFormUrl){
      setTab(tabFormUrl);
    }
  },[location.search]);

  return (
    <div className='min-h-screen mt-10'>       
        
    <div className="sidebar">
      {/* sidebar */}
      <DashSidebar/>
    </div>

    <div className="profile">
      {/* profile */}
      {tab==='profile' && <DashProfile/>}
    </div>

    <div className="posts">
      {/* posts */}
      {tab==='posts' && <DashPosts/>}
    </div>

    <div className="users">
      {/* posts */}
      {tab==='users' && <DashUsers/>}
    </div>

    
    <div className="comments">
      {/* posts */}
      {tab==='comments' && <DashComments/>}
    </div>

        
    <div className="stats">
      {/* posts */}
      {tab==='stats' && <DashOverall/>}
    </div>
    </div>

  )
}

export default Dashboard