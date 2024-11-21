"use client";

import { useState } from "react";
import { Card, CardBody, Image, Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Courses } from "../courseData.";

interface CourseDetailsProps {
  params: {
    id: string;
  };
}

export default function CourseDetails({ params }: CourseDetailsProps) {
  const { id } = params;
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const course = Courses.find((course: { id: string }) => course.id === id);

  if (!course) {
    return <p>Course not found</p>;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleEnrollRequest = () => {
    if (!file) {
      setError("Please upload the necessary documents before enrolling.");
      return;
    }

    console.log("File uploaded:", file);
    setShowPayment(true);
  };

  const handlePayment = () => {
    if (!cardNumber || !expiryDate || !cvv) {
      setError("Please fill in all payment details.");
      return;
    }

    console.log("Payment processed");
    alert("Enrollment successful!");
    router.push("/dashboard/courseRegistration");
  };

  return (
    <div className="container mx-auto px-4 py-6 mt-2">
      <Card className="w-full rounded-lg shadow-md">
        <CardBody className="p-2 flex flex-col md:flex-row">
          <Image
            src={course.image}
            alt={course.name}
            className="object-cover m-2 w-1/3"
          />
          <div className="flex-grow">
            <h2 className="text-xl font-semibold">{course.name}</h2>
            <p className="text-md mb-2">{course.code}</p>
            <p className="text-md mb-4">{course.description}</p>
            <p className="text-sm">Instructor: {course.lecturer}</p>
            <p className="text-sm">Duration: {course.duration}</p>
            <p className="text-sm mb-2">Course Fee: ${course.fee}</p>
          </div>
        </CardBody>
      </Card>

      <div className="mt-8">
        <h6 className="text-md mb-4">Upload Necessary Documents</h6>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input file-input-bordered w-full"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}

        {!showPayment ? (
          <Button
            color="primary"
            className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleEnrollRequest}
          >
            Request to Enroll
          </Button>
        ) : (
          <Card className="mt-4">
            <CardBody>
              <h6 className="text-lg font-semibold mb-4">Payment Details</h6>
              <div className="space-y-4">
                <Input
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                <div className="flex space-x-4">
                  <Input
                    label="Expiry Date"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                  <Input
                    label="CVV"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
                <Button
                  color="primary"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handlePayment}
                >
                  Pay ${course.fee} and Enroll
                </Button>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}
