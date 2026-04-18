import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import femaleAvatar from "../assets/femaleAvatar.png";
import { FaEdit } from "react-icons/fa";
export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const ProfilePage = () => {
  
  const [userDetails, setUserDetails] = useState({});
  const [userId, setUserId] = useState("");
  const [photoValue, setPhotoValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [locationValue, setLocationValue] = useState("");

  const navigate = useNavigate();

  


  useEffect(() => {
    const localStorageValue = localStorage.getItem("userId");
    if (!localStorageValue) {
      navigate("/signIn");
    } else {
      setUserId(localStorageValue);
    }
  }, []);


  const logOut = () => {
  localStorage.removeItem('userId');
  navigate('/signIn');
};

  
  useEffect(() => {
    if (userId) {
      axios
        .get(`${VITE_BACKEND_URL}/user/${userId}`)
        .then((response) => {
          setUserDetails(response.data);
          setPhotoValue(response.data.photo || "")
          setNameValue(response.data.userName || "");
          setEmailValue(response.data.email || "");
          setPhoneValue(response.data.phoneNumber || "");
          setLocationValue(response.data.city || "");
        })
        .catch((err) => console.log(err));
    }
  }, [userId]);

  const changeUserDetails = () => {
    const newObj = {
      ...userDetails,
      photo: photoValue,
      userName: nameValue,
      email: emailValue,
      phoneNumber: phoneValue,
      city: locationValue,
    };

    axios
      .put(`${VITE_BACKEND_URL}/user/${userId}`, newObj)
      .then((response) => {
        setUserDetails(response.data);
        alert("Profile updated successfully!");
      })
      .catch((err) => console.log(err));
  };
  console.log(userDetails);



  const handleUploadPhoto = async (e) => {
  const file = e.target.files[0]; 
  const formData = new FormData();
  formData.append("photo", file); 

  try {
    const res = await axios.post(`${VITE_BACKEND_URL}/upload`, formData);
    
    setPhotoValue(res.data.imageUrl); 
  } catch (err) {
    console.error(err);
  }
};



  return (
    <div className="flex flex-col pt-0 md:pt-10  bg-gray-100 min-h-screen">
    <div className="flex justify-center items-center rounded-lg ">
      <div className="max-w-[1100px] bg-gray-200 flex justify-center w-full md:rounded-lg">
        <div className="flex w-full  pt-5 p-2">
          <div className="w-full flex flex-col gap-5">
            <div className="flex gap-2 items-center">
              <Link to="/home">
                <FaArrowLeft className="cursor-pointer" />
              </Link>
              <p className="text-lg font-semibold">Edit Profile</p>
            </div>

            <div className="rounded-lg bg-white w-full p-2 pt-5 pb-5 flex flex-col gap-2">
              <p className="text-lg font-semibold">Profile Page</p>
              <span className="text-gray-400">
                Here you can change your started details.
              </span>
            </div>

            <div className="p-5 flex justify-center">
              <div className="relative w-[100px] h-[100px]">
                <img
                  src={photoValue || userDetails.photo || femaleAvatar}

                  className="rounded-full border w-full h-full object-cover"
                  alt=""
                />

                <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full cursor-pointer">
                  <FaEdit className="w-5 h-5 ml-1" />
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUploadPhoto}
                  />
                </label>
              </div>
            </div>
            <div className="bg-white rounded-md p-5 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <p className="font-semibold">Name *</p>
                <input
                  type="text"
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  className="border p-3 rounded-full bg-gray-50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-semibold">Email *</p>
                <input
                  type="text"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  className="border p-3 rounded-full bg-gray-50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-semibold">Phone Number *</p>
                <input
                  type="text"
                  value={phoneValue}
                  onChange={(e) => setPhoneValue(e.target.value)}
                  className="border p-3 rounded-full bg-gray-50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-semibold">Location *</p>
                <input
                  type="text"
                  value={locationValue}
                  onChange={(e) => setLocationValue(e.target.value)}
                  className="border p-3 rounded-full bg-gray-50"
                />
              </div>

              <button
                onClick={changeUserDetails}
                className="bg-blue-500 text-white p-3 rounded-full font-medium cursor-pointer"
              >
                Save Changes
              </button>
              <button
                onClick={logOut}
                className="bg-gray-50 p-3 rounded-full font-medium cursor-pointer"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;
