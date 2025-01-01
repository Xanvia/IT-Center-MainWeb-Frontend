"use client";

import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Reservations</h1>
      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Our Reservation System
          </h2>
          <p className="text-gray-700">
            Welcome to our reservation system. We provide an efficient and
            user-friendly platform for managing your bookings and appointments.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Select your preferred date and time</li>
            <li>Choose available services</li>
            <li>Fill in your details</li>
            <li>Confirm your reservation</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
