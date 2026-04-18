import React from "react";
import { IoMdSearch } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "/components/ui/alert-dialog";
import { IoHomeOutline } from "react-icons/io5";
import { LiaAddressBookSolid } from "react-icons/lia";



const NavFooter = ({ scrollToSearch,setFavoritesBusiness,favoritesBusiness,removeBusiness }) => {

  console.log(favoritesBusiness);
  

  return (
    <div className="max-w-[1100px] w-full p-2 pb-5 border-t border-gray-300 fixed bottom-0 bg-gray-100 shadow-md z-50 rounded-t-md">
      <div className="bg-white w-full flex justify-between p-2 rounded-l-full rounded-r-full">
        <div onClick={scrollToSearch} className="flex relative cursor-pointer ">
          <div className="bg-red-600 text-white rounded-full p-3 absolute">
            <IoMdSearch className="w-6 h-6 " />
          </div>
          <div className="bg-gray-100 rounded-l-full rounded-r-full p-3 pr-6 pl-14 ">
            <p>Search</p>
          </div>
        </div>
        <Link to="/home">
          <div className="bg-gray-100 rounded-l-full rounded-r-full p-3 cursor-pointer">
            <IoHomeOutline className="w-6 h-6" />
          </div>
        </Link>
        <AlertDialog>
                  <AlertDialogTrigger>
                    <div className="bg-gray-100 rounded-l-full rounded-r-full p-3 cursor-pointer">
                      <CiBookmark className="w-6 h-6" />
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
          <div>
          {favoritesBusiness.length === 0 ? (
            <div>Not saved business</div>
          ) : (
            <div className="flex gap-5  w-full max-w-[450px] overflow-x-scroll">
              {favoritesBusiness.map((business, index) => (
                <div key={index} className="rounded-md min-w-[300px] max-w-[300px] flex flex-col gap-2 relative">
                  <img src={business.businessImage} alt="" className="rounded-md max-w-[300px]  min-h-[300px] max-h-[300px]" />
                  <p className="text-2xl font-semibold text-black">
                    {business.businessCategory
                      ? business.businessCategory.charAt(0).toUpperCase() + business.businessCategory.slice(1)
                      : ""}
                  </p>
                  <p className="text-xl">{business.businessName}</p>
                  <button
                    className="absolute top-0 right-0 text-black border rounded-full w-10 h-10 font-semibold bg-white cursor-pointer"
                    onClick={() => removeBusiness(business.businessName)}
                  >
                    X
                  </button>
                </div>
              ))}
             
            </div>
          )}
        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
        <AlertDialog >
          <AlertDialogTrigger>
            <div className="bg-gray-100 rounded-l-full rounded-r-full p-3 cursor-pointer">
              <RxHamburgerMenu className="w-6 h-6" />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent >
                      <div className="flex flex-col items-center justify-center gap-5">
                        <AlertDialogHeader className="flex flex-col items-center justify-center gap-5">
                          <AlertDialogTitle>More:</AlertDialogTitle>
                          <AlertDialogDescription className="flex flex-col gap-5">
                            <Link to="/profile" className="flex flex-col justify-center items-center gap-2">
                              <div className="bg-gray-50 flex justify-center rounded-l-full rounded-r-full max-w-[50px] p-3 cursor-pointer">
                                <IoPersonOutline className="w-6 h-6" />
                              </div>
                                <p>Profile</p>
                              </Link>
                              <Link to="/myapp" className="flex flex-col justify-center items-center gap-2">
                                <div className="bg-gray-100 flex justify-center rounded-l-full rounded-r-full max-w-[50px] p-3 cursor-pointer">
                                  <LiaAddressBookSolid className="w-6 h-6" />
                                </div>
                                <p>My appointments</p>
                              </Link>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </div>
                    </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default NavFooter;



