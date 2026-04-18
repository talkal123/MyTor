import axios from 'axios';
import React, { useEffect, useState,useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/homePageComponents/HeaderHomePage';
import HeaderHomePage from '../components/homePageComponents/HeaderHomePage';
import CategoriesHomePage from '../components/homePageComponents/CategoriesHomePage';
import NearbyBusiness from '../components/homePageComponents/NearbyBusiness';
import PopularBusinesses from '../components/homePageComponents/PopularBusinesses';
import CardReviewHome from '../components/helpers/CardReviewHome';
import CallToAction from '../components/homePageComponents/CallToAction';
import GalleryBusinesses from '../components/homePageComponents/GalleryBusinesses';
import Footer from '../components/homePageComponents/Footer';
import NavFooter from '../components/homePageComponents/NavFooter';
export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const HomePage = ({addFavoritesBusiness,setFavoritesBusiness,favoritesBusiness,removeBusiness}) => {

    const [data,setData] = useState([])
    const [userId,setUserId] = useState("")
    const [userDetails,setUserDetails] = useState("")
    const [loading,setLoading] = useState(true)
    const [category,setCategory] = useState("barber")
    const navigate = useNavigate()
    const searchRef = useRef(null);

    
        
  const scrollToSearch = () => {
    if (searchRef.current) {
      searchRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

useEffect(() => {
  const categoryToUse = category.toLowerCase();
  setLoading(true);

  if (categoryToUse !== "all") {
    axios
      .get(`${VITE_BACKEND_URL}/business/category/${categoryToUse}`)
      .then((response) => setData(response.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  } else {
    axios
      .get(`${VITE_BACKEND_URL}/business/`)
      .then((response) => setData(response.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }
}, [category]);

 useEffect(() => {
  if (userId) {
    axios.get(`${VITE_BACKEND_URL}/user/${userId}`)
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}, [userId]);







  useEffect(() => {
    const localStorageValue = localStorage.getItem('userId')
    setUserId(localStorageValue)

    if(!localStorageValue){
      navigate('/signIn')
  } 
  }, [])


  return (
    <div className="flex justify-center w-full min-h-screen">
    <div className="w-full max-w-[1100px] pb-12">
      <HeaderHomePage searchRef={searchRef} userDetails={userDetails} data={data}/>
      <CategoriesHomePage category={category} setCategory={setCategory}/>
      <NearbyBusiness data={data} category={category} userDetails={userDetails} setCategory={setCategory} loading={loading}/>
      <PopularBusinesses data={data} category={category} userDetails={userDetails} setCategory={setCategory}/>
      <CardReviewHome />
      <CallToAction scrollToSearch={scrollToSearch}/>
      <GalleryBusinesses />
      <Footer />
      <NavFooter scrollToSearch={scrollToSearch} favoritesBusiness={favoritesBusiness} setFavoritesBusiness={setFavoritesBusiness} removeBusiness={removeBusiness}/>

    </div>
</div>
  )
}

export default HomePage
