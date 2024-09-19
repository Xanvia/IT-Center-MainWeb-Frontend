"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { PenSquare, Camera, Check, X, Plus } from "lucide-react";

type FieldType = {
  label: string;
  value: string;
  isEditing: boolean;
};

export default function profile() {
  const userType = "Staff";

  const [profileImage, setProfileImage] = useState("/placeholder.svg");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fields, setFields] = useState<FieldType[]>([
    { label: "staff Name", value: "", isEditing: false },
    { label: "designation", value: "", isEditing: false },
    { label: "nominal", value: "", isEditing: false },
    { label: "ext no", value: "", isEditing: false },
    { label: "Email", value: "", isEditing: false },
    { label: "Phone No", value: "", isEditing: false },
    
  ]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = (index: number) => {
    setFields(
      fields.map((field, i) =>
        i === index ? { ...field, isEditing: !field.isEditing } : field
      )
    );
  };

  const handleChange = (index: number, newValue: string) => {
    setFields(
      fields.map((field, i) =>
        i === index ? { ...field, value: newValue } : field
      )
    );
  };

  const handleSave = (index: number) => {
    toggleEdit(index);
    // Here you would typically save the changes to your backend
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-red-900 h-32"></div>
      <div className="relative px-4 pt-16 pb-8">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <div className="relative w-32 h-32 bg-gray-300 rounded-full overflow-hidden group">
            <Image
              src={profileImage}
              alt="Staff profile picture"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
            <div
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={handleImageClick}
            >
              <Camera className="text-white" size={24} />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-1">
          {fields[0].value || "Add Name"}
        </h2>
        <p className="text-gray-600 text-center mb-6">
          {fields[1].value || "Add designation"}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field, index) => (
            <div key={index} className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              {field.isEditing ? (
                <div className="flex">
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="w-full bg-white text-gray-800 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder={`Enter ${field.label}`}
                  />
                  <button
                    onClick={() => handleSave(index)}
                    className="ml-2 text-green-600 hover:text-green-800"
                    aria-label="Save"
                  >
                    <Check size={20} />
                  </button>
                  <button
                    onClick={() => toggleEdit(index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                    aria-label="Cancel"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex">
                  {field.value ? (
                    <input
                      type="text"
                      value={field.value}
                      readOnly
                      className="w-full bg-gray-100 text-gray-800 border border-gray-300 rounded-md py-2 px-3 focus:outline-none"
                    />
                  ) : (
                    <button
                      onClick={() => toggleEdit(index)}
                      className="w-full bg-gray-100 text-gray-400 border border-gray-300 rounded-md py-2 px-3 text-left hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      Add {field.label}
                    </button>
                  )}
                  <button
                    onClick={() => toggleEdit(index)}
                    className="ml-2 text-indigo-600 hover:text-indigo-800"
                    aria-label={field.value ? "Edit" : "Add"}
                  >
                    {field.value ? <PenSquare size={20} /> : <Plus size={20} />}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
