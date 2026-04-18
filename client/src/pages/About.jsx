import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="flex justify-center items-start p-10 bg-gray-100 min-h-screen">
      <div className="max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>

        <p className="mb-4">
          Welcome to our platform! We are committed to providing the best
          experience for our users. Our goal is to make managing your tasks,
          appointments, and personal data simple and secure.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Our Mission</h2>
        <p className="mb-4">
          Our mission is to empower users with intuitive tools that simplify
          everyday tasks and improve productivity. We focus on quality,
          security, and user satisfaction.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Our Team</h2>
        <p className="mb-4">
          Our team consists of passionate developers, designers, and
          strategists who work together to create a seamless user experience.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Us</h2>
        <p className="mb-4">
          Have questions or suggestions? We'd love to hear from you! Reach out
          to us at <span className="text-blue-600">support@example.com</span>.
        </p>

        <Link
          to="/home"
          className="inline-block mt-6 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default About;
