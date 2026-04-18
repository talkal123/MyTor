import React from 'react'
import { FaStar } from "react-icons/fa";


const Bottom = ({ businessData, arr, userDetails, rating, ratingValue, addRate,addFavoritesBusiness}) => {
  return (
    <div className=" max-w-[400px]">
                <div >
                <img
                  src={businessData?.images?.[0]}
                  className="max-h-[150px] w-full object-cover object-center rounded-t-lg"
                  alt=""
                />
              </div>
              <div className="bg-gray-300 rounded-full w-20 h-20 absolute top-25 left-10 overflow-hidden">
                <img
                  src={businessData?.images?.[1]}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-5">
              <div className="p-10 pt-20 flex flex-col gap-10 border rounded-b-lg">
                <div className="flex flex-col gap-2">
                  <h1 className="text-xl font-bold">
                    {businessData?.businessName}
                  </h1>
                  <span className="">{businessData?.description}</span>
                </div>
                <div className="flex flex-col gap-5">
                  {arr.map((item, index) => (
                    <div key={index} className=" flex gap-5 items-center">
                      <div>
                        <p className="text-blue-600">{item.icon}</p>
                      </div>
                      <div>
                        <span className=" font-semibold">{item.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div></div>
              </div>
              <div className="flex flex-col justify-center  rounded-lg items- border-0 md:border gap-4 pt-10 pb-10">
                <div className="flex flex-col items-center">
                  <h3 className="font-semibold mb-2">Users Rating:</h3>
                  {businessData?.rating?.map((rate, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <p className="font-medium">
                        {rate.userName || "Unknown"}
                      </p>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <FaStar
                            key={i}
                            className={`w-5 h-5 ${
                              i < rate.value
                                ? "text-yellow-300"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                

                <div className="flex flex-col items-center mb-10 gap-2 mt-4">
                  <p className="font-semibold">Rate Us:</p>
                  <div className="flex gap-1">
                    {userDetails.userName &&
                      rating.map((rate, index) => (
                        <FaStar
                          key={index}
                          onClick={() => addRate(rate.value)}
                          className={`w-6 h-6 cursor-pointer ${
                            rate.value <= ratingValue
                              ? "text-yellow-300"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
    </div>
  )
}

export default Bottom
