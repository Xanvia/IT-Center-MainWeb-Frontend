"use client";

import Axios from "@/config/axios";
import React, { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

declare global {
  interface Window {
    errorCallback: (error: any) => void;
    cancelCallback: () => void;
    successCallback: (response: any) => void;
    Checkout: any;
  }
}

const PaymentPage = () => {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [sessionnId, setSessionId] = useState<string | null>(null);

  const handlePayment = async () => {
    const token = await recaptchaRef.current?.executeAsync();
    setRecaptchaToken(token!);

    if (!token) {
      alert("You Failed the ReCAPTCHA");
      return;
    }

    try {
      // Initiate payment session
      console.log("Initiating payment...");
      console.log("Recaptcha Token: ", token);
      const response = await Axios.post("/payment/initiate", {
        recaptchaToken: token,
        recordId: "fb150d72-9322-49a1-afe4-d1ccee9064ac", // Replace with dynamic amount
        type: "RESERVE",
      });

      const { sessionId, responseParams, version } = response.data;
      console.log("Response Params: ", responseParams);
      console.log("Payment initiated:", sessionId);
      console.log("Version: ", version);
      setSessionId(sessionId);

      const Checkout = (window as any).Checkout;

      // configure and show payment page
      if (sessionId && Checkout) {
        // console.log(Checkout);
        Checkout.configure({
          session: {
            id: sessionId,
            version: version,
          },
        });

        // console.log(Checkout);
        Checkout.showPaymentPage();
      } else {
        console.error("Checkout library not loaded.");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  useEffect(() => {
    window.errorCallback = (error: any) => {
      console.log(error);
      console.error("An error occurred during the payment process.");
    };

    window.cancelCallback = () => {
      console.log("The user canceled the payment.");
    };

    window.successCallback = async (response: any) => {
      try {
        const { paymentId, sessionId } = response;
        console.log("Payment ID:", paymentId);

        // Verify payment
        console.log("Verifying payment...");
        const verifyResponse = await Axios.post("/payment/verify", {
          paymentId,
          sessionId,
        });

        console.log("Payment verified:", verifyResponse.data);
        alert("Payment successful. You can now access the course.");
      } catch (error) {
        console.error("Error verifying payment:", error);
        alert("Failed to verify payment. Please try again.");
      }
    };
  }, []);

  useEffect(() => {
    // Dynamically add the script to the page
    const script = document.createElement("script");
    script.src =
      "https://bankofceylon.gateway.mastercard.com/static/checkout/checkout.min.js";
    script.setAttribute("data-error", "errorCallback");
    script.setAttribute("data-cancel", "cancelCallback");
    script.setAttribute("data-complete", "successCallback");
    script.async = true;

    // Append the script to the document
    document.body.appendChild(script);

    return () => {
      // Clean up by removing the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-[80vh] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Payment Details</h1>
          <p className="mt-2 text-sm text-gray-600">
            Complete your payment for the reservation
          </p>
        </div>

        <div className="space-y-6">
          {/* ReCAPTCHA centered */}
          <div className="flex justify-center mb-6">
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={process.env.NEXT_PUBLIC_SITE_KEY!}
              onChange={(token) => setRecaptchaToken(token)}
              onExpired={() => setRecaptchaToken("")}
            />
          </div>

          {/* Payment button */}
          <button
            onClick={handlePayment}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Pay Now
          </button>

          {/* Additional information */}
          <p className="text-xs text-center text-gray-500 mt-4">
            Secure payment powered by Mastercard
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
