export default function FAQ() {
  const qA = {
    "What services do you offer at the IT center?":
      "We offer a wide range of services including network setup, software development, cyber-security solutions, and IT consulting.",
    "How can I stay updated on the latest news and events?":
      "You can visit our news and events section on our website.",
    "Do we have any restriction when reserving a lab?":
      "No restrictions. Anyone can request! However the acceptance of a reservation will depend upon many factors...",
  };
  return (
    <div className="bg-lightergray p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Common Questions</h2>
      <p className="mb-4 text-gray-600">
        Here are some of the most common questions that we get.
      </p>
      <div className="space-y-4 overflow-scroll h-80 my-6">
        {Object.entries(qA).map(([q, a]) => (
          <div>
            <h3 className="font-medium">{q}</h3>
            <p className="text-gray-600">{a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
