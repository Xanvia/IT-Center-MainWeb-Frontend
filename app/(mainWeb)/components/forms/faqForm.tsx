"use client";

import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function FAQForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ name, email, question });
  };
  return (
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
          className="w-full  rounded-lg p-2 accent-yellow-200"
        />
      </div>
      <div>
        <label className="block mb-1">Question</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
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
  );
}
