import React from 'react'
import star from "../../assets/star.svg"

const CardReviewHome = () => {
  const reviews = [
  {
    user: "Dana",
    business: "Idan's Barber Shop",
    text: "Idan was professional and friendly! Highly recommended.",
    img:"https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg",
    rating: 5,
  },
  {
    user: "Yossi",
    business: "Liron Beauty Salon",
    text: "Amazing service, clean and welcoming place.",
    img:"https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
    rating: 4,
  },
  {
    user: "Sarah",
    business: "Fitness Gym Pro",
    text: "Great trainers and excellent equipment.",
    img:"https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg",
    rating: 5,
  },
  {
    user: "Michael",
    business: "Joe's Restaurant",
    text: "Delicious food and great atmosphere!",
    img:"https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
    rating: 4,
  },
];
  return (
    <div className='w-full mt-10'>
      {reviews.slice(0,3).map((reviews,index) => (
        <div key={index} className=' p-5 flex flex-col gap-2 shadow-2xl rounded-lg'>
        <div className='flex gap-1 p-1'>
          {Array.from({ length: Math.round(reviews.rating) }).map((_, i) => (
            <img key={i} src={star} className="w-5 h-5" alt="star" />
          ))}
                    
        </div>
        <div className='pt-3 pb-3'>
          <p className='text-gray-500'>{reviews.text}</p>
        </div>
        <div className='flex gap-2'>
          <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                  <img src={reviews.img} className='w-full h-full object-cover' alt="" />
                </div>
          <div className='flex flex-col p-1'>
            <h4 className='font-bold'>{reviews.user}</h4>
            <p className='text-gray-500 font-light'>{reviews.business}</p>
          </div>
        </div>
      </div>
      ))}
      
    </div>
  )
}

export default CardReviewHome
