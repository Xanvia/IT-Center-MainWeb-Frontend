"use client";

import { Button } from "@nextui-org/react";
import { useState } from "react";
import axios from "@/config/axios";
import { CustomAlert } from "../../components/forms/CustomeAlert";

export default function ReqServicesForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Form validation
    if (!name || !email || !service || !description) {
      setAlertMessage("Please fill in all fields");
      setAlertType("error");
      setShowAlert(true);
      setIsSubmitting(false);
      return;
    }

    // Format the description as requested
    const formattedDescription = `(${name}) : (${service}) : (${description})`;

    const payload = {
      email,
      description: formattedDescription,
    };

    try {
      const response = await axios.post("/feedbacks", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Form submitted successfully:", response.data);
      setAlertMessage("Your request has been submitted successfully!");
      setAlertType("success");
      setShowAlert(true);

      // Reset form fields
      setName("");
      setEmail("");
      setService("");
      setDescription("");
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlertMessage("Failed to submit your request. Please try again.");
      setAlertType("error");
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-row">
          <div className="basis-1/2 pr-2">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg p-2 accent-yellow-200"
              required
            />
          </div>
          <div className="basis-1/2 pl-2">
            <label className="block mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg p-2 accent-yellow-200"
              required
            />
          </div>
        </div>
        <div className="py-4">
          <select
            className="select select-bordered w-full"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          >
            <option value="" disabled>
              What do you need..?
            </option>
            <option>Visiting lecturers</option>
            <option>Conducting workshops/ Training programs</option>
            <option>Technical Advisory Services</option>
            <option>Tender Evaluation</option>
            <option>Technical Evaluation</option>
            <option>Site Inspections</option>
            <option>Part time Services</option>
            <option>Software Projects</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg p-2 resize-none accent-yellow-200"
            rows={4}
            required
          />
        </div>
        <div className="flex justify-end">
          <Button
            isLoading={isSubmitting}
            type="submit"
            color="primary"
            radius="sm"
            size="lg"
            variant="ghost"
          >
            Submit
          </Button>
        </div>
      </form>
      <CustomAlert
        message={alertMessage}
        isVisible={showAlert}
        onClose={() => setShowAlert(false)}
        type={alertType}
      />
    </>
  );
}
