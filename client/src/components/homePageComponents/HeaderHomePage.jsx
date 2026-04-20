import React, { useEffect, useState } from "react";
import { TiLocationOutline } from "react-icons/ti";
import { IoMdSearch } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import femaleAvatar from "../../assets/femaleAvatar.png";
import maleAvatar from "../../assets/maleAvatar.png";

const HeaderHomePage = ({ userDetails, data,searchRef }) => {
  const date = new Date();
  const dateString = date.toDateString();
  const withoutYear = dateString.split(" ").slice(0, 3).join(" ");
  const [inputValue, setInputValue] = useState("");
  const [filteredArr, setFilteredArr] = useState([]);
  const [display, setDisplay] = useState(false);

  

  useEffect(() => {
    if (!Array.isArray(data)) return;

    const filter = data.filter((business) =>
      business.businessName.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredArr(filter);

    if (inputValue.trim() === "") {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  }, [inputValue, data]);

  return (
    <div ref={searchRef} className="flex flex-col gap-5 p-5">
      <div className="border-1 border-gray-300 rounded-r-full rounded-l-full p-1 flex justify-between  ">
        <div className="flex gap-2">
          <div>
            <div>
              <div className="rounded-full p-5 bg-red-100 max-w-[70px] max-h-[70px]">
                <TiLocationOutline className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-md text-gray-500 font-semibold">
              Current Location
            </span>
            <span className="text-lg font-semibold">
              {" "}
              {userDetails.city
                ? userDetails.city.charAt(0).toUpperCase() +
                  userDetails.city.slice(1)
                : ""}
              .
            </span>
          </div>
        </div>
        <div>
          <Link to="/profile">
          <div className="rounded-full max-w-[70px] max-h-[70px]">
    <img
      className="rounded-full bg-no-repeat min-h-[70px] min-w-[70px] max-w-[70px] max-h-[70px]"
      src={
        userDetails.photo && userDetails.photo.length !== 0
          ? userDetails.photo
          : userDetails.gender === "male"
          ? maleAvatar
          : femaleAvatar
      }
  alt=""
/>

          </div>
          </Link>
        </div>
      </div>
      <div className="bg-red-50 bg-opacity-90 rounded-xl w-full">
        <div className=" flex flex-col gap-3">
          <div className="p-5 flex flex-col gap-3">
            <div>
              <div className="text-3xl font-semibold flex gap-2">
                <span className="text-red-600">Hello!</span>{" "}
                {userDetails.userName
                  ? userDetails.userName.charAt(0).toUpperCase() +
                    userDetails.userName.slice(1)
                  : ""}
                👋
              </div>
            </div>
            <div>
              <span className="text-gray-500 text-md font-semibold">
                {withoutYear} - Today
              </span>
            </div>
          </div>
          <div className="w-full p-2 pb-5">
            <div className="relative">
              <div className="bg-white rounded-r-full rounded-l-full p-4 w-full flex items-center gap-5">
                <div className="bg-gray-200 rounded-full p-2">
                  <IoMdSearch className="w-6 h-6" />
                </div>
                <input
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setDisplay(false);
                  }}
                  placeholder="Search your place here"
                  type="text"
                  className="outline-none border-none bg-transparent text-gray-700 text-lg placeholder-gray-400 w-full"
                />
              </div>
              <div className="absolute z-50 w-full  mt-2">
                {display && (
                  <div className="bg-white w-full rounded-xl shadow-lg border border-gray-200 p-4 max-h-[450px]  overflow-y-auto space-y-4">
                    {filteredArr.length === 0 ? (
                      <p className="text-center text-gray-500">No businesses</p>
                    ) : (
                      filteredArr.map((business) => (
                        <Link key={business._id} to={`/business/id/${business._id}`}>
                        <div
                          key={business._id}
                          className="flex items-center gap-4 p-4 w-full rounded-lg hover:bg-gray-100 transition cursor-pointer"
                        >
                          <img
                            src={business.images[0]}
                            alt={business.businessName}
                            className="min-w-20 max-w-20 min-h-20 max-h-20 rounded-md object-cover border border-gray-300"
                          />
                          <div className="flex flex-col gap-3 w-full">
                            <div className="flex justify-between items-center">
                              <h2 className="text-lg font-semibold text-gray-800">
                                {business.businessName}
                              </h2>
                              <div className="text-sm text-gray-600 flex gap-2">
                                <span className="font-medium">
                                  <FaStar className="w-5 h-5 text-yellow-300" />
                                </span>{" "}
                                {business.rating.length > 0
                                  ? (
                                      business.rating.reduce(
                                        (total, rating) => total + rating.value,
                                        0
                                      ) / business.rating.length
                                    ).toFixed(1)
                                  : "No rating"}
                              </div>
                            </div>
                            <div>
                              <div className="flex gap-1">
                                <span className="font-medium">
                                  <TiLocationOutline className="w-5 h-5" />
                                </span>{" "}
                                <span className="text-sm text-gray-600">
                                  {business.address}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        </Link>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderHomePage;
