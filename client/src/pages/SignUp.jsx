import React from "react";
import video from "../assets/4065629-uhd_2160_4096_25fps.mp4";
import Header from "../components/signUpComponents/Header";
import FormSignUp from "../components/signUpComponents/FormSignUp";

const SignUp = () => {
  return (
    <div className="flex h-screen justify-between p-5">
      <div className="w-2/2 lg:w-2/2 flex flex-col items-center">
      <div className="flex flex-col gap-10">
        <Header />
        <FormSignUp />
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 rounded-lg overflow-hidden ">
        <video
          src={video}
          autoPlay
          muted
          loop
          className="w-full h-screen object-cover  rounded-lg "
        />
      </div>
    </div>
  );
};

export default SignUp;
