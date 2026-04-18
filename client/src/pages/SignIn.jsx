import React, { useState } from "react";
import booking from "../assets/booking.webp";
import HeaderSignIn from "../components/signInComponents/HeaderSignIn";
import FormSignIn from "../components/signInComponents/FormSignIn";

const SignIn = () => {
      const [loading, setLoading] = useState(false);

  return (
    <div className="flex h-screen justify-between p-5">
      <div className="w-2/2 lg:w-2/2 flex flex-col items-center">
      <div className="flex flex-col gap-10">
        <HeaderSignIn loading={loading} setLoading={setLoading}/>
        <FormSignIn loading={loading} setLoading={setLoading}/>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 rounded-lg overflow-hidden ">
        <img
          src={booking}
          className="w-full h-screen object-cover rounded-lg "
        />
      </div>
    </div>
  );
};


export default SignIn
