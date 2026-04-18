import React from 'react'
import { Link } from 'react-router-dom';

const CardHomePage = ({data}) => {
    const newBusinessType = data.businessType.charAt(0).toUpperCase() + data.businessType.slice(1);

    

  
  return (
    <div>
      <div className='w-full'>
        <div style={{ backgroundImage: `url(${data.images[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className='p-1 shadow-xl rounded-lg min-h-[350px] max-h-[350px]'>
            <div className='p-3 flex justify-between text-white items-center'>
              <div className='flex gap-2'>
                <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
                  <img src={data.businessOwnerPhoto} className='w-full h-full object-cover' alt="" />
                </div>
                <div className='flex flex-col'>
                  <h4>{data.businessOwner}</h4>
                  <span className='font-light'>{newBusinessType}</span>
                </div>
              </div>
              <div>
                <Link to = {`/business/id/${data._id}`}><button className='bg-red-500 rounded-r-full rounded-l-full p-2 pr-3 pl-3 font-light opacity-100 cursor-pointer'>Open now</button></Link></div>
            </div>
        </div>
      </div>

    </div>
  )
}

export default CardHomePage
