import React, { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


  

  const handleSubmit = () => {
    e.preventDefault();
    console.log({ name, email, message });
    alert("Message sent successfully!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="flex justify-center items-start p-10 bg-gray-100 min-h-screen">
      <div className="max-w-3xl bg-white rounded-lg shadow-lg p-8 w-full">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

        <p className="mb-6">
          Have questions or suggestions? Fill out the form below and we'll get
          back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-3 rounded-full bg-gray-50"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-3 rounded-full bg-gray-50"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold">Message *</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border p-3 rounded-xl bg-gray-50 h-32 resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-full font-medium hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>

        <Link
          to="/home"
          className="inline-block mt-6 bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Contact;
