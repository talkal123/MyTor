import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdOutlinePhone } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
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
} from "@/components/ui/alert-dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendarDate } from "react-icons/bs";



const Header = ({
  userId,
  appointmentTime,
  setAppointmentTime,
  businessData,
  setBusinessData,
  service,
  setService,
  isOpen,
  setIsOpen,
  time,
  setTime,
  date,
  filteredAppointments,
  appointment,
  setAppointment,
  nameValue,
  setNameValue,
  startedNumber,
  setStartedNumber,
  phoneNumber,
  setPhoneNumber,
  sendSMS,
  changeAppointment,
  withoutYear,
  newAppointment,
  businessAppointment,
  theFilteredAppointments,
  setTheFilterAppointments }) => {


      
      

      const arr = [ 
        {
          time:"12:00"
        },
        {
          time:"13:00"
        },
        {
          time:"14:00"
        },
        {
          time:"15:00"
        },
        {
          time:"16:00"
        },
        {
          time:"17:00"
        },
        {
          time:"18:00"
        },
      ]

      
   
useEffect(() => {
  const availableSlots = arr.filter((slot) => {
  const isTaken = businessAppointment.some((app) => 
    app.time === slot.time && app.date === time && app.isActive
  );
  return !isTaken;
});


setTheFilterAppointments(availableSlots);

  
}, [businessAppointment, time]); 



  return (
    <div>
      <div className="pr-5 pl-5 w-full ">
              <div className=" border-b-1 pt-5 pb-5">
                <h2 className="font-bold text-xl">Book Your Appointment</h2>
              </div>
              <div className="border-b-1 pt-5 pb-5 flex gap-0 md:gap-20 items-center justify-center md:justify-start">
                <div>
                  <img
                    src={businessData?.images?.[1]}
                    className="hidden md:flex w-25 h-25 rounded-lg object-cover"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Carousel className="max-w-xs p-5">
                    <CarouselContent>
                      {businessData?.services?.map((item, index) => (
                        <CarouselItem
                          key={index}
                          className="basis-full min-w-[250px] max-w-[250px]"
                        >
                          <div className="p-0">
                            <Card
                              onClick={() => setService(item.name)}
                              onDoubleClick={() => setService(null)}
                              className="cursor-pointer hover:bg-gray-50"
                              style={{
                                backgroundColor:
                                  item.name === service ? "#1E90FF" : "white",
                                color:
                                  item.name === service ? "white" : "black",
                              }}
                            >
                              <CardContent className="flex aspect-square items-center justify-center max-h-[100px] w-full">
                                <div className="flex flex-col gap-1">
                                  <div>
                                    <h3 className="font-bold text-lg">
                                      {item.name}
                                    </h3>
                                  </div>
                                  <div className="flex gap-2">
                                    <h3 className="font-semibold">
                                      ${item.price}
                                    </h3>
                                    <span className="text-center">•</span>
                                    <span className="text-gray-300">
                                      {item.serviceTime} minutes
                                    </span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden lg:flex" />
                    <CarouselNext className="hidden lg:flex" />
                  </Carousel>
                </div>
              </div>
              <div className="pt-5 flex flex-col gap-8">
                <div>
                  <p className="font-bold text-lg">{withoutYear}</p>
                </div>
                <div className="flex gap-5">
                  <div className="flex items-center">
                      <BsCalendarDate onClick={() => setIsOpen((prev) => !prev)} className="w-6 h-6"/>
                  </div>
                  <div>
                    <DatePicker
                    open={isOpen}
                    selected={time}
                    onChange={(date) => {setTime(date.toISOString().split("T")[0]); setIsOpen(false)}}
                    dateFormat="dd/MM/yyyy"
                    locale="en"
                    placeholderText="Select a date"
                    className="border p-2 rounded-lg w-full"
                  />
                </div>
              </div>
              </div>
    

             <div className="p-5">
  {service !== null ? (
    <div className="w-full p-5 grid grid-cols-2 md:grid-cols-4 gap-3">
      {theFilteredAppointments.map((item, index) => (
        <AlertDialog key={index}>
          <AlertDialogTrigger asChild>
            <div
              onClick={() => setAppointmentTime(item.time)}
              className="border flex items-center justify-center max-w-20 p-5 rounded-md text-center cursor-pointer"
              style={{
                backgroundColor:
                  item.time === appointmentTime ? "#1E90FF" : "",
                color: item.time === appointmentTime ? "white" : "black",
              }}
            >
              <span>{item.time}</span>
            </div>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Set appointment at {item.time}:00
              </AlertDialogTitle>
              <AlertDialogDescription className="p-5 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-black font-semibold text-lg">Service</label>
                <input
                  type="text"
                  value={service || ""}
                  readOnly
                  className="border p-2 rounded-lg w-full bg-gray-100 text-gray-700"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-black font-semibold text-lg">Name *</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  className="border p-2 rounded-lg w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-black font-semibold text-lg">Phone Number *</label>
                <div className="flex gap-2">
                  <select
                    onChange={(e) => setStartedNumber(e.target.value)}
                    className="p-2 border rounded-lg"
                    value={startedNumber}
                  >
                    <option value="">Select Country</option>
                    <option value="+972">+972</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Your Phone Number"
                    value={phoneNumber}
                    onChange={(e) => {
                      const onlyNumbers = e.target.value.replace(/\D/g, "");
                      setPhoneNumber(onlyNumbers);
                    }}
                    maxLength={9}
                    className="border p-2 rounded-lg w-full"
                  />
                </div>
              </div>
            </AlertDialogDescription>

            </AlertDialogHeader>
              <AlertDialogFooter className="p-5 w-full">
              <div className="w-full flex flex-col gap-2">
              {nameValue !== "" && phoneNumber !== "" ? (
                <Link to="/successfully" className="w-full  ">
                <button
                  onClick={async () => {
                    await newAppointment(); 
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg w-full transition-colors duration-200 cursor-pointer"
                >
                  Confirm Appointment
                </button>
                </Link>
              ) : (
                <button className="bg-gray-300 text-white font-semibold py-3 rounded-lg w-full cursor-not-allowed">
                  Confirm Appointment
                </button>
              )}
              <AlertDialogCancel className="py-3 w-full">Cancel</AlertDialogCancel>
            </div>
            </AlertDialogFooter>


          </AlertDialogContent>
        </AlertDialog>
      ))}
    </div>
  ) : (
    <div>please choose service</div>
  )}
</div>

</div>
</div>
)
}

export default Header

      //  {/* <div className="flex flex-wrap items-center justify-center gap-2 p-5 pt-10 pb-10">
      //           {service === null ? (
      //             <p className="text-center w-full text-red-400">
      //               ↑ Please choose a service. ↑
      //             </p>
      //           ) : filteredAppointments.length === 0 ? (
      //             <p className="text-center w-full">Empty Appointments.</p>
      //           ) : (
      //             <div className="flex flex-wrap gap-2 items-center justify-center">
      //                 {filteredAppointments
      //                   .filter(a => a.clientName === null && a.date === time)
      //                   .sort((a, b) => a.time.localeCompare(b.time))
      //                   .map((item, index) => (
                        
      //                   <AlertDialog key={index}>
      //                     <AlertDialogTrigger asChild>
      //                       <div
      //                         style={{
      //                           backgroundColor:
      //                             item.time === appointment
      //                               ? "#1E90FF"
      //                               : "white",
      //                           color:
      //                             item.time === appointment ? "white" : "black",
      //                         }}
      //                         className="border cursor-pointer w-20 h-20 rounded-lg flex items-center justify-center"
      //                         onClick={() => setAppointment(item.time)}
      //                       >
      //                         {item.time}
      //                       </div>
      //                     </AlertDialogTrigger>

      //                     <AlertDialogContent className="p-0">
      //                       <AlertDialogHeader className="relative">
      //                         <div className="absolute top-0 right-0">
      //                           <AlertDialogAction className="border bg-white hover:bg-gray-200 cursor-pointer text-black rounded-full">
      //                             X
      //                           </AlertDialogAction>
      //                         </div>
      //                         <AlertDialogTitle className="p-5">
      //                           Determine in {item.time} || Type: {service}
      //                         </AlertDialogTitle>
      //                         <AlertDialogDescription className="p-5 flex flex-col gap-5">
      //                           <div className="flex flex-col gap-4">
      //                             <h3 className="text-xl font-semibold">
      //                               Enter your details
      //                             </h3>
      //                             <p className="text-black font-semibold text-lg">
      //                               Name *
      //                             </p>
      //                             <input
      //                               type="text"
      //                               placeholder="Your Name"
      //                               value={nameValue}
      //                               onChange={(e) =>
      //                                 setNameValue(e.target.value)
      //                               }
      //                               className="border p-2 rounded-lg w-full"
      //                             />
      //                           </div>

      //                           <p className="text-black font-semibold text-lg">
      //                             Phone Number *
      //                           </p>
      //                           <div className="flex gap-10">
      //                           <select
      //                             onChange={(e) => setStartedNumber(e.target.value)}
      //                             className="p-2 border rounded-lg"
      //                             value={startedNumber} 
      //                           >
      //                             <option value="">Select your country</option>
      //                             <option value="+972">+972</option>
      //                           </select>

      //                           <input
      //                             type="text"
      //                             placeholder="Your Phone Number"
      //                             value={phoneNumber}
      //                             onChange={(e) => {
      //                               const onlyNumbers = e.target.value.replace(/\D/g, "");
      //                               setPhoneNumber(onlyNumbers);
      //                             }}
      //                             maxLength={9} 
      //                             className="border p-2 rounded-lg w-full"
      //                           />
      //                         </div>


      //                         </AlertDialogDescription>
      //                       </AlertDialogHeader>
      //                       <AlertDialogFooter className="p-5 w-full">
      //                         {nameValue !== "" && phoneNumber !== "" ? (
      //                           <Link
      //                             to="/successfully"
      //                             className="w-full block"
      //                           >
      //                             <AlertDialogCancel
      //                               className="bg-black text-white pt-5.5 pb-5.5 rounded-lg text-lg font-semibold w-full cursor-pointer"
      //                               onClick={async () => {
      //                               await changeAppointment(item);

      //                               await sendSMS(item);

      //                               // setTimeout(() => setDisplaySuccessful(false), 2000);
      //                             }}
      //                             >
      //                               Determine
      //                             </AlertDialogCancel>
      //                           </Link>
      //                         ) : (
      //                           <button className="bg-gray-300 text-white p-2 pt-2 pb-2 text-lg rounded-lg font-semibold w-full">
      //                             Determine
      //                           </button>
      //                         )}
      //                       </AlertDialogFooter>
      //                     </AlertDialogContent>
      //                   </AlertDialog>
      //                 ))}
      //             </div>
      //           )}
      //         </div> */}