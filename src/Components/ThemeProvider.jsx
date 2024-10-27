import React from 'react'
import { useSelector } from 'react-redux'

function ThemeProvider({ children }) {
    const {theme}=useSelector(state=>state.theme)
  return (
    <div className={theme}>
    <div className='bg-gray-100 text-gray-700 dark:text-gray-200 dark:bg-[rgb(22,25,31)] min-h-screen'>
      {children}
    </div>
  </div>
  )
}

export default ThemeProvider