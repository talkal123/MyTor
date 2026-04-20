import React from "react";
import BusinessWomen from "../assets/BusinessWomen.png";
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
        
        <div>
          <img src={BusinessWomen} alt="BusinessWomen" className="w-full h-screen object-cover  rounded-lg"/>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
