"use client";

import axios from "@/config/axios";
import { toast } from "@/hooks/use-toast";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { CustomAlert } from "./CustomeAlert";

export default function FAQForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name,
      email,
      description,
    };

    try {
      const response = await axios.post("/feedbacks", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Form submitted successfully:", response.data);
      setShowAlert(true);

      toast({
        title: "Reservation saved.",
        description: "Your reservation has been saved successfully",
      });

      setName("");
      setEmail("");
      setDescription("");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to submit your question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg p-2 accent-yellow-200"
          />
        </div>
        <div>
          <label className="block mb-1">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg p-2 accent-yellow-200"
          />
        </div>
        <div>
          <label className="block mb-1">Question</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg p-2 resize-none accent-yellow-200"
            rows={4}
          />
        </div>
        <div className="flex justify-end mr-5">
          <Button
            isLoading={isSubmitting}
            type="submit"
            color="primary"
            radius="sm"
            size="sm"
            variant="ghost"
          >
            Submit
          </Button>
        </div>
      </form>
      <CustomAlert
        message="Your question has been submitted!"
        isVisible={showAlert}
        onClose={() => setShowAlert(false)}
        type={"success"}
      />
    </>
  );
}
