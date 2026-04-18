import React from "react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="flex justify-center items-start p-10 bg-gray-100 min-h-screen">
      <div className="max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your personal information when you use our
          services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Information We Collect</h2>
        <p className="mb-4">
          We may collect personal information such as your name, email address,
          phone number, and location when you register or use our services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
        <p className="mb-4">
          Your information is used to provide and improve our services, send
          notifications, and personalize your experience.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Data Protection</h2>
        <p className="mb-4">
          We implement appropriate technical and organizational measures to
          protect your data from unauthorized access, disclosure, or loss.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Sharing Your Information</h2>
        <p className="mb-4">
          We do not sell or rent your personal information to third parties. We
          may share data with trusted partners who assist us in providing our
          services.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Your Rights</h2>
        <p className="mb-4">
          You have the right to access, update, or delete your personal
          information. Contact us if you wish to exercise these rights.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, you can contact
          us at <span className="text-blue-600">support@example.com</span>.
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

export default Privacy;
