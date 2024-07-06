"use client";

import { Button } from "@nextui-org/react";
import { useState } from "react";

export default function ReqServicesForm() {
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
      <div className="flex flex-row">
        <div className="basis-1/2 pr-2">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg p-2 accent-yellow-200"
          />
        </div>
        <div className="basis-1/2 pl-2">
          <label className="block mb-1">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full  rounded-lg p-2 accent-yellow-200"
          />
        </div>
      </div>
      <div className="py-4">
        <select className="select select-bordered w-full">
          <option disabled selected className="font-">
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
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full rounded-lg p-2 resize-none accent-yellow-200"
          rows={4}
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
  );
}
