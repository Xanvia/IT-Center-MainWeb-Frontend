import { qA } from "@/CONSTANT_DATA/C.FAQ";
import React from "react";

export default function FAQ() {
  return (
    <div className="bg-lightergray p-6 rounded-lg shadow-lg relative z-10">
      <h2 className="text-2xl font-semibold mb-4">Common Questions</h2>
      <p className="mb-4 text-gray-600">
        Here are some of the most common questions that we get.
      </p>
      <div className="space-y-4 overflow-scroll h-80 my-6">
        {qA.map(({ q, a }, index) => (
          <div key={`${q}-${index}`}>
            <h3 className="font-medium">{q}</h3>
            <p className="text-gray-600">{a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
