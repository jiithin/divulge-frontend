import React, { useEffect, useState } from 'react'
import { animateScroll as scroll } from 'react-scroll';

function DarkMode() {

    const [shouldRender, setShouldRender] = useState(false);

    const handleClick = () => {
        scroll.scrollToTop({ duration: 0 });
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 2000;
            if (window.scrollY > scrollThreshold) setShouldRender(true)
            else setShouldRender(false);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
    }, []);
  return (
    // this is actually scroll on top not darkmode
    <div className="fixed bottom-0 right-0 p-4">
  <button className="bg-gray-800/50 text-purple-300 rounded-full w-10 h-10 flex items-center justify-center" onClick={handleClick}>
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
    </svg>
  </button>
</div>
  )
}

export default DarkMode