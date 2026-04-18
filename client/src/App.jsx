import { BrowserRouter as Router, Routes, Route,Navigate, BrowserRouter } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Business from './pages/Business';
import './App.css'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import BusinessById from './pages/BusinessById';
import Successfully from './pages/Successfully';
import Privecy from './pages/Privecy';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminPage from './pages/AdminPage';
import MyAppointments from './pages/MyAppointments';
export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function App() {

  const [favoritesBusiness,setFavoritesBusiness] = useState([])


  const addFavoritesBusiness = (business) => {
  const addBusiness = {
    businessName: business.businessName,
    businessCategory: business.businessType,
    businessImage: business.images[0],
  };

  const findBusiness = favoritesBusiness.some(
    (b) => b.businessName === business.businessName
  );

  if (findBusiness) {
    alert("This business is already in the array");
  } else {
    setFavoritesBusiness([...favoritesBusiness, addBusiness]);
  }
  
};

const removeBusiness = (businessName) => {
  const findBusiness = favoritesBusiness.some(
    (b) => b.businessName === businessName
  );

  if (findBusiness) {
    const filter = favoritesBusiness.filter((b) => b.businessName !== businessName)
    setFavoritesBusiness(filter)
      console.log(favoritesBusiness);

  } else {
    ""
  }
}


  




  return (
        <BrowserRouter>

      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<HomePage addFavoritesBusiness={addFavoritesBusiness} favoritesBusiness={favoritesBusiness} setFavoritesBusiness={setFavoritesBusiness} removeBusiness={removeBusiness}/>} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/business/category/:newCategory" element={<Business addFavoritesBusiness={addFavoritesBusiness} favoritesBusiness={favoritesBusiness} setFavoritesBusiness={setFavoritesBusiness} removeBusiness={removeBusiness}/>} />
        <Route path="/business/id/:id" element={<BusinessById addFavoritesBusiness={addFavoritesBusiness} favoritesBusiness={favoritesBusiness} setFavoritesBusiness={setFavoritesBusiness} removeBusiness={removeBusiness}/>} />
        <Route path="/successfully" element={<Successfully />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/privacy" element={<Privecy />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/myapp" element={<MyAppointments />} />
      </Routes>
        </BrowserRouter >

  )
}

export default App
