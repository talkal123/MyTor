import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { userid } = useParams();
const [userId, setUserId] = useState(userid || "");

useEffect(() => {
  if (!userid) {
    const localStorageValue = localStorage.getItem("userId");
    if (localStorageValue) {
      setUserId(localStorageValue);
    }
  }
}, [userid]);


  useEffect(() => {
    if (userId !== "") {
      axios
        .get(`${VITE_BACKEND_URL}/api/appointments/byuser/${userId}`)
        .then((response) => setAppointments(response.data))
        .catch((error) => console.error(error));
    }
  }, [userId]);

  console.log(appointments);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
    <div className="flex p-2 justify-between ">
      <div>
        <Link to="/home">
            <FaArrowLeft className="cursor-pointer w-6 h-6" />
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        My Appointments
      </h1>
    </div>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">
          No appointments yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                src={appt.businessPhoto}
                alt={appt.businessName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {appt.businessName}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  📅 {appt.date} at 🕒 {appt.time}
                </p>
                <p className="text-gray-700 mt-2">
                  👤 Client: {appt.clientName}
                </p>
                <p className="text-gray-700">
                  📞 {appt.phoneNumber}
                </p>
                {appt.isActive ? (
                  <p className="mt-3 inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Active
                  </p>
                ) : (
                  <p className="mt-3 inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                    Canceled
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
