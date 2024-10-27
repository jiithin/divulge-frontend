import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'


function AdminPrivateRoute() {
    //somthing wrong with isAdmin when signing out error throws

    const {currentUser}=useSelector((state)=>state.user)
  return currentUser.isAdmin ? <Outlet/>:<Navigate to='/sign-in'/>
}

export default AdminPrivateRoute