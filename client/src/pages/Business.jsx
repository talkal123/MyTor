import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/homePageComponents/HeaderHomePage";
import LocationImage from "../assets/Location.avif";
import { PiSlidersThin } from "react-icons/pi";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";
import { TiLocationOutline } from "react-icons/ti";
import { FaStar } from "react-icons/fa";
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
import NavFooter from "@/components/homePageComponents/NavFooter";
export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Business = ({setFavoritesBusiness,favoritesBusiness,removeBusiness,addFavoritesBusiness}) => {
  const [data, setData] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [userId,setUserId] = useState("")
  const [filterArr, setFilterArr] = useState([]);
  const [sorted, setSorted] = useState("");
  const [value, setValue] = useState("");
  const { newCategory } = useParams();
  const searchRef = useRef(null);
  const [loading,setLoading] = useState(true)


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

console.log(userDetails);




useEffect(() => {
    const localStorageValue = localStorage.getItem('userId')
    setUserId(localStorageValue)

   
  }, [])

  const scrollToSearch = () => {
    if (searchRef.current) {
      searchRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  


  useEffect(() => {
  setFilterArr(data);
}, [data]);

console.log(newCategory);

const getAverageRating = (rating) => {
  if (!rating || rating.length === 0) return 0; 
  const total = rating.reduce((total,item) => total + item.value, 0)
  return total / rating.length
}


const topBusiness = filterArr.reduce((total, item) => {
  if (!total) return item;
  if (getAverageRating(item.rating) > getAverageRating(total.rating)) {
    return item
  } else {
   return total
  }
}, null)



  const handleFilter = () => {
  let newArr = [...data];
  
  if (value !== "") {
    newArr = newArr.filter((b) =>
      b.businessName.toLowerCase().includes(value.toLowerCase())
    );
  }

  if (sorted === "a-z") {
    newArr.sort((a, b) => a.businessName.localeCompare(b.businessName));
  } else if (sorted === "z-a") {
    newArr.sort((a, b) => b.businessName.localeCompare(a.businessName));
  } 
    else if (sorted === "mostPopular") {
    newArr.sort((a, b) => getAverageRating(b.rating) - getAverageRating(a.rating));
  } else if (sorted === "leastPopular") {
    newArr.sort((a, b) => getAverageRating(a.rating) - getAverageRating(b.rating));
  }

  if (userDetails.city) {
  newArr = newArr.filter((b) =>
    b.address.toLowerCase().includes(userDetails.city.toLowerCase())
  );
}

  

  setFilterArr(newArr);
};


  useEffect(() => {
    handleFilter();
  }, [value,sorted,data]);

useEffect(() => {
  const categoryToUse = newCategory.toLowerCase();
  if (categoryToUse !== "all") {
    axios
      .get(`${VITE_BACKEND_URL}/business/category/${categoryToUse}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  } else {
    axios
      .get(`${VITE_BACKEND_URL}/business/`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }
}, [newCategory]);


  return (
    <div className="flex justify-center w-full">
      <div className="max-w-[1100px] relative w-full min-h-screen bg-gray-100">
        <div
          className="relative w-full min-h-[50%] md:min-h-[80%] bg-cover bg-center"
          style={{ backgroundImage: `url(${LocationImage})` }}
        >
          <div className="absolute top-8 left-4 right-4 flex justify-between gap-5">
            <div className="relative w-full opacity-80">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center space-x-2 pointer-events-none ">
                <IoMdSearch className="w-5 h-5 text-gray-400" />
              </div>
              <input
                ref={searchRef}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full pl-20 p-3 rounded-full shadow-lg bg-white text-black"
                placeholder="Search here..."
              />
            </div>
            <div>
            <AlertDialog>
              <AlertDialogTrigger>
                <div className="bg-red-600 text-white rounded-full p-3 ">
                  <PiSlidersThin className="w-6 h-6 " />
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="flex flex-col justify-center items-center">
                <AlertDialogHeader>
                  <AlertDialogTitle>More filters:</AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col justify-center items-center gap-2">
                        <span className="text-black text-lg">Sort:</span>
                        <div className="flex gap-2 justify-center items-center">
                          <div>A-Z</div>
                          <input onChange={(e) => setSorted(e.target.value)} type="radio" name="sort" value="a-z" />
                        </div>
                        <div className="flex gap-2 justify-center items-center">
                          <div>Z-A</div>
                          <input onChange={(e) => setSorted(e.target.value)} type="radio" name="sort" value="z-a" />
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <div className="text-black text-lg">Most Popular:</div>
                        <div className="flex gap-2 justify-center items-center">
                          <span>Most Popular</span>
                          <input
                            type="radio"
                            onChange={(e) => setSorted(e.target.value)}
                            name="popularity"
                            value="mostPopular"
                          />
                        </div>
                        <div className="flex gap-2 justify-center items-center">
                          <span>Least Popular</span>
                          <input
                            type="radio"
                            onChange={(e) => setSorted(e.target.value)}
                            name="popularity"
                            value="leastPopular"
                          />
                        </div>
                      </div>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            </div>
          </div>
        </div>

        <div className="absolute top-[40vh] md:top-[70vh] rounded-t-3xl left-0 w-full">
          <div className="bg-gray-100 rounded-t-3xl p-5 shadow-lg ">
            <div className="w-full flex justify-center p-2">
              <h2 className="text-xl font-semibold mb-4">
                List of {newCategory}s
              </h2>
            </div>
            <div className="flex flex-col  items-center w-full gap-3 min-h-[60vh] max-h-[60vh] overflow-y-auto pb-15 mb-5">
              {loading === true ? (
              <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500'></div>
              ):(
                <div className="flex flex-col gap-3 overflow-y-auto max-h-[50vh] w-full">
              {filterArr.length === 0 ? (
                <div className="flex justify-center ">
                  <h1 className="text-xl">No result...</h1>
                </div>
              ) : (
                filterArr.map((business) => (
                  <Link key={business._id} to={`/business/id/${business._id}`}>
                  <div
                    key={business._id}
                    style={{backgroundColor: topBusiness && business._id === topBusiness._id ? "#FFF9C4" : "white"}}
                    className="flex items-center bg-white gap-4 p-4 rounded-lg hover:bg-gray-100 transition cursor-pointer "
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
                          </span>
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
                          </span>
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
        <NavFooter scrollToSearch={scrollToSearch} addFavoritesBusiness={addFavoritesBusiness} favoritesBusiness={favoritesBusiness} setFavoritesBusiness={setFavoritesBusiness} removeBusiness={removeBusiness}/>
    </div>
    
  );
};

export default Business;
