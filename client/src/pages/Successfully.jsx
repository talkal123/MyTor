import React from "react";
import { Link } from "react-router-dom";
import success from "../assets/success.svg";

const Successfully = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-[1100px] bg-gray-50 flex justify-center items-center w-full h-screen">
        <div className="flex flex-col gap-5 items-center">
          <div>
            <img src={success} alt="Success" />
          </div>
          <div className="font-semibold text-xl">Successfully!</div>

          <Link
            to="/home"
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Successfully;
