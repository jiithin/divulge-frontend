import React from 'react'
import logo from "../assets/divulge.png"
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaDev } from "react-icons/fa";
import { BiSolidUserRectangle } from "react-icons/bi";
import { toggleTheme } from '../redux/theme/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IoMoon } from "react-icons/io5";
import { TbSunFilled } from "react-icons/tb";

function Footer() {
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.theme);

  return (
  
<footer className="bg-transparent backdrop-blur-0">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex items-center justify-between">
            <a href='/' className="flex items-center  space-x-3 rtl:space-x-reverse">
                <img src={logo} className="h-5" alt="Flowbite Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap font-ElsieSwash text-transparent bg-clip-text bg-gradient-to-l to-blue-400 from-purple-600">Divulge.</span>
            </a>

            {/* darkmode button footer */}
            <button type="button" className="w-12 h-10 lg:hidden md:hidden sm:inline   bg-transparent   rounded-lg text-sm px-3 text-center items-center  dark:bg-inherit  " 
               onClick={() => dispatch(toggleTheme())}>
               {theme === 'light' ?(<IoMoon className='w-6 h-6 text-purple-500'/>):(<TbSunFilled className='w-7 h-7 text-blue-400'/>)}
           </button>

            {/* <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-purple-500 sm:mb-0 dark:text-purple-400">
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/jiithin-gangadharan/" class="hover:underline">Contact</a>
                </li>
            </ul> */}
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="text-center">
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400 mb-4">© Hey <a href="https://github.com/jiithin/BlogApp/" className="hover:underline">this was a fun project, Take it if youwant.</a></span>
        
        <div className="flex mt-4 justify-center sm:mt-0">
              <a href="https://www.linkedin.com/in/jiithin-gangadharan/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <FaLinkedin />
                  
              </a>
              <a href="https://github.com/jiithin/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
              <FaGithubSquare />
              </a>
              <a href="https://dev.to/jiithin/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
              <FaDev />
              </a>
              <a href="https://portfolio-jithin.vercel.app/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
              <BiSolidUserRectangle />
              </a>
              
          </div>
        </div>
        
    </div>
</footer>



  )
}

export default Footer