import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdOutlinePhone } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "@/components/businessByIdComponents/Header";
import Bottom from "@/components/businessByIdComponents/Bottom";
import NavFooter from "@/components/homePageComponents/NavFooter";
import Nav from "@/components/businessByIdComponents/Nav";
import { VITE_BACKEND_URL } from "@/App";


const BusinessById = ({addFavoritesBusiness,setFavoritesBusiness,favoritesBusiness,removeBusiness}) => {
  const date = new Date();
  const dateString = date.toDateString();
  const today = date.toISOString().split("T")[0];

  const withoutYear = dateString.split(" ").slice(0, 3).join(" ");

  const [time, setTime] = useState(today);
  const [appointmentTime,setAppointmentTime] = useState("")
  const [businessData, setBusinessData] = useState([]);
  const [theFilteredAppointments,setTheFilterAppointments] = useState([])
  const [businessAppointment, setBusinessAppointment] = useState([]);
  const [appointment, setAppointment] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [service, setService] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [userId, setUserId] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [startedNumber, setStartedNumber] = useState("");
  const [isOpen,setIsOpen] = useState(false)

console.log(businessData);

  
  

  const rating = [
    {
      value: 1,
      icon: <FaStar className="w-5 h-5 " />,
    },
    {
      value: 2,
      icon: <FaStar className="w-5 h-5 " />,
    },
    {
      value: 3,
      icon: <FaStar className="w-5 h-5 " />,
    },
    {
      value: 4,
      icon: <FaStar className="w-5 h-5" />,
    },
    {
      value: 5,
      icon: <FaStar className="w-5 h-5" />,
    },
  ];


  const arr = [
    {
      icon: <MdOutlinePhone className="w-5 h-5" />,
      name: businessData.phone,
    },
    {
      icon: <CiLocationOn className="w-5 h-5" />,
      name: businessData.address,
    },
    {
      icon: <CiMail className="w-5 h-5" />,
      name: businessData.email,
    },
    {
      icon: <CiClock2 className="w-5 h-5" />,
      name: "Closes in 1h 47m",
    },
    {
      icon: <CiBookmark onClick={() => addFavoritesBusiness(businessData)} className="w-5 h-5 cursor-pointer" color={favoritesBusiness.some(b => b.businessName === businessData.businessName)? "red": ""} />,
      name: "Click here to save business"
    }
  ];


  console.log(businessData);
  console.log(favoritesBusiness);
  
  
  const { id } = useParams();

  // ------------------- useEffect: load userId -------------------
  useEffect(() => {
    const localStorageValue = localStorage.getItem("userId");
    setUserId(localStorageValue);

    if (!localStorageValue) {
      navigate("/signIn");
    }
  }, []);

  // ------------------- useEffect: load user details -------------------
  useEffect(() => {
    if (userId) {
      axios
        .get(`${VITE_BACKEND_URL}/user/${userId}`)
        .then((response) => {
          setUserDetails(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);

  // ------------------- useEffect: load business -------------------
  useEffect(() => {
    if (id) {
      axios
        .get(`${VITE_BACKEND_URL}/business/${id}`)
        .then((response) => {
          setBusinessData(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  // ------------------- useEffect: load appointments -------------------
  useEffect(() => {
    if (id) {
      axios
        .get(`${VITE_BACKEND_URL}/appointment/business/${id}`)
        .then((response) => {
          const appointments = response.data
          setBusinessAppointment(appointments);

          

        })
        .catch((err) => console.log(err));
    }
  }, [id]);


  

  

  
  
  

  // ------------------- פונקציות -------------------
  const changeAppointment = async (item) => {
    if (nameValue.trim() === "") {
      alert("Name required");
      return;
    }

    const newObject = {
      ...item,
      clientName: nameValue,
      phoneNumber,
      isActive: true,
      
    };

    try {
      const response = await axios.put(
        `${VITE_BACKEND_URL}/appointment/${item._id}`,
        newObject
      );

      setBusinessAppointment((prev) =>
        prev.map((appt) => (appt._id === item._id ? response.data : appt))
      );
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const newAppointment = async() => {
      const newObj = {
        businessId: id,
        businessName: businessData.businessName,
        businessPhoto: businessData.images[1],
        clientName: nameValue,
        phoneNumber,
        date: time,
        time: appointmentTime,
        service,
        userId
      };
      console.log(newObj);

       try {
      const response = await axios.post(
        `${VITE_BACKEND_URL}/appointment`,
        newObj
      );

      setBusinessAppointment((prev) => [...prev, response.data]);
    } catch (err) {
      console.error(err);
    }
      
    }

  const addRate = async (rateValue) => {
    if (!userId || !userDetails || !userDetails.userName) {
      console.log("UserDetails עדיין לא מוכן!");
      return;
    }

    

    const newObj = {
      userId,
      value: rateValue,
      userName: userDetails.userName,
    };

    try {
      const response = await axios.post(
        `${VITE_BACKEND_URL}/business/${id}/rate`,
        newObj
      );

      setBusinessData((prev) => ({ ...prev, rating: response.data }));
      setRatingValue(rateValue);
    } catch (err) {
      console.error(err);
    }
  };



const sendSMS = async (item) => {
  const phone = `${startedNumber}${phoneNumber}`; // +972 + הספרות
  console.log("Sending SMS to:", phone); // בדיקה

  if (phoneNumber.length !== 9) {
    alert("Please enter 9 digits after +972.");
    return;
  }

  const message = `Hi ${nameValue}, your appointment for *${service}* at ${businessData.businessName} is confirmed!
Date & Time: ${item.time}
We look forward to seeing you!`;

  const response = await fetch(`${VITE_BACKEND_URL}/send-sms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, message }),
  });

  const data = await response.json();
  console.log(data);
};




  // ------------------- חישוב appointments -------------------

const filteredAppointments = businessAppointment
  .filter(a => a.clientName === null && a.date === time)
  .sort((a, b) => a.time.localeCompare(b.time));


  






  return (
    <div className="flex justify-center items-center bg-gray-200 min-h-screen ">
      <div className="max-w-[1100px] w-full p-5 justify-center  ">
        <div className=" p-5 rounded-lg bg-white min-h-[800px] ">
          <div className="flex flex-col md:flex-row justify-between h-full ">
            <Header
            userId={userId}
            theFilteredAppointments={theFilteredAppointments}
            setTheFilterAppointments={setTheFilterAppointments}
            businessAppointment={businessAppointment}
              newAppointment={newAppointment}
              appointmentTime={appointmentTime}
              setAppointmentTime={setAppointmentTime}
              businessData={businessData}
              setBusinessData={setBusinessData}
              service={service}
              setService={setService}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              time={time}
              setTime={setTime}
              date={date}
              filteredAppointments={filteredAppointments}
              appointment={appointment}
              setAppointment={setAppointment}
              nameValue={nameValue}
              setNameValue={setNameValue}
              startedNumber={startedNumber}
              setStartedNumber={setStartedNumber}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              sendSMS={sendSMS}
              changeAppointment={changeAppointment}
              withoutYear={withoutYear}
            />
            
            <div className="rounded-lg relative">
             <Bottom
             addFavoritesBusiness={addFavoritesBusiness}
              businessData={businessData}
              arr={arr}
              userDetails={userDetails}
              rating={rating}
              ratingValue={ratingValue}
              addRate={addRate}
          />

            </div>
          </div>
        </div>
      </div>
    <Nav favoritesBusiness={favoritesBusiness} setFavoritesBusiness={setFavoritesBusiness} removeBusiness={removeBusiness}/>
    </div>
  );
};

export default BusinessById;





