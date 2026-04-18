import React from 'react'
import CardHomePage from '../helpers/CardHomePage'
import UnHappyPhoto from '../../assets/unhappy-result.svg'
import { useNavigate } from 'react-router-dom';
const PopularBusinesses = ({data,userDetails,setCategory,category}) => {
    const newCategory = category.charAt(0).toUpperCase() + category.slice(1);

  const navigate = useNavigate()
const handleClick = () => {
  navigate(`/business/category/${category.toLowerCase()}`);
};

 return (
    <div className='mt-10 p-5'>
    <div className='w-full'>
      <div className='flex justify-between items-center'>
        <h1 className='font-semibold text-lg'>Popular {newCategory}s</h1>
        <span onClick={() => handleClick()} className='text-sm text-gray-500 cursor-pointer'>View all</span>
      </div>
      <div className='p-1 mt-5 flex flex-col gap-5'>
        {data.length === 0 ? (
          <div className=' flex flex-col gap-10 items-center justify-center'>
            <p className='text-center mt-5'>"No businesses found in your area. Try adjusting your location!"</p>
            <div>
              <img className='w-20 h-20' src={UnHappyPhoto} alt="" />
            </div>
          </div>
          
        ): (
          data.slice(0,3).map((business,index) => (
          <CardHomePage key={index} data={business} userDetails={userDetails} />
        ))
        )}
      </div>
    </div>
    </div>
  )

}

export default PopularBusinesses
