import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL
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
} from "@/components/ui/alert-dialog"

const AdminPage = () => {

  const userId = localStorage.getItem("userId")



  const [business,setBusiness] = useState([])
  const [businessId,setBusinessId] = useState("")
  const [appointments,setAppointments] = useState([])
  const [userDetails,setUserDetails] = useState("")
  const [loading,setLoading] = useState(true)
  

  useEffect(() => {
    axios
      .get(`${VITE_BACKEND_URL}/business/byOwner/${userId}`)
      .then((response) => {
        console.log(response.data);
        setBusiness(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  // useEffect(() => {
  //   axios
  //     .get(`${VITE_BACKEND_URL}/appointment/business/68b462d9b125c59754c34976`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setAppointments(response.data)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [])

  useEffect(() => {
    axios
      .get(`${VITE_BACKEND_URL}/appointment/business/${businessId}`)
      .then((response) => {
        console.log(response.data);
        setAppointments(response.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [businessId])


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
}, []);
  

console.log(businessId);

  
  
  
  return (
  <div className="flex flex-col gap-10  bg-gray-50 min-h-screen p-6">
    <div className='flex flex-col gap-5'>
    <div className="text-3xl font-semibold flex gap-2">
     <span className="text-red-600">Hello!</span>{" "}
       {userDetails.userName
         ? userDetails.userName.charAt(0).toUpperCase() +
           userDetails.userName.slice(1)
           : ""}
                👋
    </div>
    <h2 className='text-2xl font-semibold'>Your Businesses:</h2>
    </div>
  <div className="max-w-[1100px] w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {business.map((item, index) => (
      <div
        key={index}
        className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-2xl overflow-hidden flex flex-col items-center p-4 border border-gray-100"
      >
        <img
          src={item.images[0]}
          alt={item.businessName}
          className="h-48 w-full object-cover rounded-xl mb-3"
        />
        <p className="text-lg font-semibold text-gray-800">{item.businessName}</p>
        <p className="text-sm text-gray-500 mt-1">{item.businessType
        .charAt(0).toUpperCase() +
           item.businessType.slice(1) || 'No category specified'}</p>
        <AlertDialog>
  <AlertDialogTrigger>
    <button
      onClick={() => {
        setBusinessId(item._id);
        setLoading(true); // ברגע שלחצת, מתחילים טעינה
      }}
      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-xl transition-colors"
    >
      Manage Business
    </button>
  </AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>All appointments</AlertDialogTitle>
      <AlertDialogDescription className="p-5 flex flex-col gap-3">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="loader"></div> 
            <p>Loading...</p>
          </div>
        ) : appointments.length === 0 ? (
          <p>No appointments found</p>
        ) : (
          appointments.map((item, index) => (
            <div key={index} className="border rounded-md bg-gray-50">
              <div className="p-5 flex flex-col gap-2 justify-center items-center">
                <p>
                  <span className="text-lg font-semibold">Client name:</span>{" "}
                  {item.clientName}
                </p>
                <p>
                  <span className="text-lg font-semibold">Date:</span>{" "}
                  {item.date}
                </p>
                <p>
                  <span className="text-lg font-semibold">Client phone:</span>{" "}
                  {item.phoneNumber}
                </p>
              </div>
            </div>
          ))
        )}
      </AlertDialogDescription>
    </AlertDialogHeader>

    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

        
      </div>
     
    ))}
  </div>
   
</div>


  )
}

export default AdminPage
