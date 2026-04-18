import React from "react";
import { useNavigate } from "react-router-dom";
import barber from "../../assets/barber.svg";
import restaurant from "../../assets/restaurant.svg";
import beautySalon from "../../assets/wig.svg";
import clothes from "../../assets/fashion.svg";
import gym from "../../assets/gym.svg";

const CategoriesHomePage = ({ category, setCategory }) => {
  const navigate = useNavigate();

  const categoriesArr = [
  { logo: barber, title: "Barber", type: "barber" },
  { logo: restaurant, title: "Restaurant", type: "restaurant" },
  { logo: beautySalon, title: "Salon", type: "salon" },
  { logo: clothes, title: "Clothes", type: "clothes" },
  { logo: gym, title: "Gym", type: "gym" },
];


  const handleClick = (type) => {
    setCategory(type);
    // setTimeout(() => {
    //   navigate(`/business/category/${title.toLowerCase()}`);
    // }, 1500); 
  };

  return (
    <div className="mt-5 p-5">
      <div className="flex gap-5 overflow-auto p-2">
        {categoriesArr.map((item, index) => {
          const isActive = category === item.type;

          return (
            <div
              onClick={() => handleClick(item.type)}
              key={index}
              className={`cursor-pointer min-w-[100px] max-w-[100px] min-h-[100px] max-h-[100px] 
                rounded-lg p-4 flex flex-col items-center justify-center transition-all duration-200
                ${isActive ? "border-2 border-red-300 bg-gray-100 shadow-lg scale-105" : "border border-gray-300 bg-gray-100"}`}
            >
              <img src={item.logo} alt={item.title} className="mb-2 w-12 h-12" />
              <p className={`text-gray-800 text-center ${isActive ? "font-semibold" : "font-medium"}`}>
                {item.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesHomePage;
