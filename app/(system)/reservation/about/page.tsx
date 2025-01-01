"use client";

import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="mx-auto p-8 px-20">
      <div className="mx-auto">
        <h1 className="text-3xl font-rubik font-bold text-center my-12 text-maroon">
          About Reservations
        </h1>
      </div>
      <div className="space-y-4">
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Our Reservation System
          </h2>
          <p className="text-gray-700">
            Welcome to IT Center Reservations! We provide a simple and easy way
            to reserve lab spaces and halls for your needs. You can book a space
            for your classes, meetings, and other events.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">How It Works</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Select your preferred Reservation. </li>
            <li>Choose available Time slot and Date. </li>
            <li>Fill in your details. </li>
            <li>Confirm your Reservation Request. </li>
            <li>Get notified when your Reservation is approved. </li>
            <li>Proceed to payment and complete your reservation. </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Terms and Conditions</h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold">1. Eligibility and Registration</h3>
              <ul className="list-disc list-inside ml-4">
                <li>
                  Only registered users are eligible to request reservations for
                  labs and halls within the IT Center.
                </li>
                <li>
                  Registered users must be over 18 years old and may not use
                  another user’s account to make reservations.
                </li>
                <li>
                  University of Peradeniya (UOP) students may make reservations
                  indirectly through any UOP staff member at no charge.
                </li>
                <li>
                  UOP students can make reservations through staff members at
                  Conditioned rates.
                </li>
                <li>
                  UOP staff members can register using their official university
                  Google account via Google Authenticator and are eligible to
                  make reservations at conditioned rates.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">2. Reservation Requests</h3>
              <ul className="list-disc list-inside ml-4">
                <li>
                  Reservation requests may be submitted directly through the web
                  application or by contacting the IT Center administration.
                </li>
                <li>
                  Users will receive a confirmation notification upon approval
                  of the reservation request.
                </li>
                <li>
                  Reservations are subject to availability and are approved on a
                  first-come, first-served basis.
                </li>
                <li>
                  The IT Center reserves the right to prioritize reservations
                  based on operational needs or urgency.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">3. Usage and Responsibilities</h3>
              <ul className="list-disc list-inside ml-4">
                <li>
                  Users are responsible for ensuring that labs or halls are used
                  in a responsible, professional manner and according to the IT
                  Center’s policies.
                </li>
                <li>
                  Facilities must be left clean and free of damage. Users may be
                  held liable for any damages incurred during their reservation
                  period.
                </li>
                <li>
                  Unauthorized use or subleasing of reserved space is
                  prohibited.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">4. Payment and Fees</h3>
              <ul className="list-disc list-inside ml-4">
                <li>
                  UOP staff members, under authorized conditions and cases, are
                  exempt from reservation fees.
                </li>
                <li>External users are subject to a usage fee.</li>
                <li>
                  Users have multiple payment options: they can pay online
                  through the platform, pay later by making an online payment
                  through the website, or pay on the date of their reservation
                  or before at the IT Center.
                </li>
                <li>
                  Payment policies are subject to change, and fees are
                  non-refundable unless otherwise stated.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">5. Cancellations and Changes</h3>
              <ul className="list-disc list-inside ml-4">
                <li>
                  Cancellations can be made before confirmation. If you wish to
                  cancel after confirmation, you must contact the IT Center.
                </li>
                <li>
                  The IT Center reserves the right to cancel or reschedule
                  reservations due to unforeseen circumstances.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">6. Privacy and Data Protection</h3>
              <ul className="list-disc list-inside ml-4">
                <li>
                  Users’ personal information is collected, stored, and
                  protected in accordance with the IT Center’s privacy policy.
                </li>
                <li>
                  Registration data, usage history, and communications may be
                  recorded and reviewed for security purposes.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">7. Amendments to Terms</h3>
              <p className="ml-4">
                The IT Center reserves the right to amend these Terms and
                Conditions at any time without prior notice. Updated terms will
                be posted on the website, and continued use constitutes
                acceptance of any changes.
              </p>
            </div>

            <p>
              By registering for an account and submitting a reservation
              request, you agree to these Terms and Conditions and acknowledge
              your commitment to comply with the IT Center’s policies and
              standards.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
