import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const FormSignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [newUser, setNewUser] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  console.log(newUser);
  console.log(gender);
  console.log(city);
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { userName: name, email, password, city, gender,role };
    setNewUser(user);
    axios
      .post(`${VITE_BACKEND_URL}/user`, user)
      .then((result) => {
        console.log(result);
        setSuccessMessage("Account successfully created");
        setErrorMessage("");
        navigate("/signIn");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Cannot submit");
        setSuccessMessage("");
      });

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  console.log(role);
  
  return (
    <div className="flex flex-col gap-2">
      <div className=" w-full flex items-center">
        <div className="w-full border-t-1 border-gray-300"></div>
        <div className="text-gray-300 text-md mb-1">
          <span>or</span>
        </div>
        <div className="w-full border-t-1 border-gray-300"></div>
      </div>
      <div>
        <form onSubmit={handleSubmit} action="">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Name*</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Enter Your Name"
                className="border-1 border-gray-300 w-full rounded-lg p-3"
                type="text"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-semibold">Email*</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter Your Email"
                className="border-1 border-gray-300 w-full rounded-lg p-3"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Password*</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter Your Password"
                className="border-1 border-gray-300 w-full rounded-lg p-3"
                type="password"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Phone Number*</p>
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                placeholder="Enter Your Phone Number"
                className="border-1 border-gray-300 w-full rounded-lg p-3"
                type="number"
              />
            </div>
            <div className="flex flex-col gap-2">
  <p className="font-semibold">City*</p>
  <select
    onChange={(e) => setCity(e.target.value.toLowerCase().trim())}
    value={city}
    className="border border-gray-300 w-full rounded-lg p-3 bg-white"
  >
    <option value="">Select Your City</option>
    <option value="tel aviv">Tel Aviv</option>
    <option value="jerusalem">Jerusalem</option>
    <option value="haifa">Haifa</option>
    <option value="rishon lezion">Rishon Lezion</option>
    <option value="petah tikva">Petah Tikva</option>
    <option value="ashdod">Ashdod</option>
    <option value="netanya">Netanya</option>
    <option value="beer sheva">Beer Sheva</option>
    <option value="holon">Holon</option>
    <option value="bnei brak">Bnei Brak</option>
    <option value="rehovot">Rehovot</option>
    <option value="bat yam">Bat Yam</option>
    <option value="ashkelon">Ashkelon</option>
    <option value="herzliya">Herzliya</option>
    <option value="ramat Gan">Ramat Gan</option>
    <option value="modiin">Modiin</option>
    <option value="raanana">Raanana</option>
    <option value="nahariya">Nahariya</option>
    <option value="eilat">Eilat</option>
  </select>
</div>

            <div className="flex flex-col gap-2">
              <p className="font-semibold">Role*</p>
            <select className="border p-2 rounded-md" onChange={(e) => setRole(e.target.value)} id="role" name="role">
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-semibold">Gander*</p>
              <div className="flex gap-4">
                <div
                  onClick={() => setGender("male")}
                  className={
                    gender === "male"
                      ? "border-1 border-gray-400 cursor-pointer p-1 rounded-lg bg-gray-400"
                      : "border-1 border-gray-400 cursor-pointer p-1 rounded-lg"
                  }
                >
                  <FaMale className="w-5 h-5" />
                </div>

                <div
                  onClick={() => setGender("female")}
                  className={
                    gender === "female"
                      ? "border-1 border-gray-400 cursor-pointer p-1 rounded-lg bg-gray-400"
                      : "border-1 border-gray-400 cursor-pointer p-1 rounded-lg"
                  }
                >
                  <FaFemale className="w-5 h-5" />
                </div>
              </div>
            </div>
            <div className="w-full">
              <button
                type="submit"
                className="text-white font-semibold bg-black p-5 text-center rounded-lg hover:bg-gray-900 cursor-pointer transition-[100ms] w-full"
              >
                Create Account
              </button>
            </div>
            <div>
              {successMessage && (
                <p className="text-green-600 font-semibold">{successMessage}</p>
              )}
              {errorMessage && (
                <p className="text-red-600 font-semibold">{errorMessage}</p>
              )}
            </div>
            <div className="flex gap-1">
              <span>Already have an account? </span>
              <span className="font-semibold">
                <Link to={"/signIn"}>Login Here</Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSignUp;
