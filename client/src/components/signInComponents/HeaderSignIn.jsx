import React, { useEffect } from 'react'
import { MdAppRegistration } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL


const HeaderSignIn = ({setLoading}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();

  const handleGoogleLogin = (credentialResponse) => {
    setLoading(true)

    const user = jwtDecode(credentialResponse.credential);
    console.log(user);
    

axios.post(`${VITE_BACKEND_URL}/google/auth`, user)

  .then(result => {
    setLoading(false)

    const data = result.data;
    console.log("data", data);

    if (!data._id) { // משתמשים ב-_id של Mongoose
      navigate('/signin');
      return;
    }

    localStorage.setItem("userId", data._id);

    if (data.role === "admin") {
      navigate('/adminpage');
    } else if (data.role === "client") {
      navigate('/home');
    } else {
      navigate('/signin');
    }
  })
  .catch(err => {
    console.log(err);
    setLoading(false)

  });

  };




  return (
    <div className="">
          <div className="flex gap-1 mb-15">
            <div className="bg-black p-1 rounded-lg"><MdAppRegistration className="w-5 h-5 text-white"/></div>
            <h3 className="font-bold text-xl">My Tor</h3>
          </div>
          <div className="flex flex-col gap-5 mb-5">
            <h1 className="font-semibold text-6xl">Sign in to<br /> business organized</h1>
            <span className="text-gray-400 text-sm">Sign up to start your skills</span>
          </div>
         
<div className='flex items-center justify-center'>
        <GoogleLogin
  size="large"
  width={isMobile ? "300px" : "800px"}
  onSuccess={handleGoogleLogin}
        onError={() => console.log('Login failed')}
/>
</div>

        </div>

        
  )
}

export default HeaderSignIn


