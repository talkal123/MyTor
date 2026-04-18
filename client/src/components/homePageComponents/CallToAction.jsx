import React from 'react'
import { useNavigate } from 'react-router-dom';


const CallToAction = ({scrollToSearch}) => {
  return (
    <div className="w-full mt-10 rounded-2xl overflow-hidden shadow-2xl">
  <div className="relative">
    <img
      className="max-h-[350px] min-h-[350px] w-full object-cover opacity-80"
      src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
      alt="Scheduling banner"
    />
    <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center">
      <h2 className="text-white text-4xl md:text-5xl font-bold text-center px-6 leading-snug">
        Manage Your Time <br className="hidden md:block" /> Like a Pro.
      </h2>
      <div><button onClick={scrollToSearch} className='bg-red-500 text-white rounded-r-full rounded-l-full p-2 pr-3 pl-3 font-light opacity-100 cursor-pointer'>Explore Businesses</button></div>
    </div>
  </div>
</div>

  )
}

export default CallToAction
