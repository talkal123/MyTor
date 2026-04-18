import React, { useEffect } from 'react'
import { MdAppRegistration } from "react-icons/md";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
  
    const navigate = useNavigate()

  return (
    <div className="">
      <div className="flex gap-1 mb-15">
        <div className="bg-black p-1 rounded-lg"><MdAppRegistration className="w-5 h-5 text-white"/></div>
        <h3 className="font-bold text-xl">My Tor</h3>
      </div>
      <div className="flex flex-col gap-5 mb-5">
        <h1 className="font-semibold text-6xl">Keep your online<br /> business organized</h1>
        <span className="text-gray-400 text-sm">Sign up to start your skills</span>
      </div>
      
      <div className='p-5 flex items-center gap-2 justify-center cursor-pointer'>
              <GoogleLogin
              width={isMobile ? "300px" : "700px"}
              onSuccess={(credentialResponse) => {console.log(credentialResponse)
                console.log(jwtDecode(credentialResponse.credential))
                navigate("/home");
                
              }} 
              onError={() => console.log("Login failed")}/>
              </div>
    </div>
  );
};

export default Header;
