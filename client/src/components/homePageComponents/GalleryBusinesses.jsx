import React from "react";

const GalleryBusinesses = () => {
  const businesses = [
    {
      name: "Joe's Barber Shop",
      image:
        "https://images.pexels.com/photos/3992870/pexels-photo-3992870.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      name: "Fresh Eats Restaurant",
      image:
        "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
    {
      name: "Beauty Salon Deluxe",
      image:
        "https://images.pexels.com/photos/6724464/pexels-photo-6724464.jpeg",
    },
    {
      name: "Fit Gym Center",
      image:
        "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-2 mt-10">
      {businesses.map((item, index) => (
        <div key={index} className="rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative">
            <img
              className="h-[200px] w-full object-cover"
              src={item.image}
              alt={item.name}
            />
            <div className="truncate whitespace-nowrap overflow-hidden text-ellipsis absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4 text-xl font-semibold">
              {item.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryBusinesses;
