import React from "react";

export default function FAQ() {
  interface QAItem {
    q: string;
    a: string;
  }
  const qA: QAItem[] = [
    {
      q: "What services do you offer at the IT center?",
      a: "We offer a wide range of services including network setup, software development, cyber-security solutions, and IT consulting.",
    },
    {
      q: "How can I stay updated on the latest news and events?",
      a: "You can visit our news and events section on our website.",
    },
    {
      q: "Do we have any restriction when reserving a lab?",
      a: "No restrictions. Anyone can request! However the acceptance of a reservation will depend upon many factors...",
    },
  ];
  return (
    <div className="bg-lightergray p-6 rounded-lg shadow-lg">
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
