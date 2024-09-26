"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { PenSquare, Camera, Check, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FieldType = {
  label: string;
  name: string;
  value: string;
  isEditing: boolean;
};

type FormData = {
  staffName: string;
  designation: string;
  nominal: string;
  extNo: string;
  email: string;
  phoneNo: string;
};

export default function Component() {
  const [profileImage, setProfileImage] = useState("/placeholder.svg");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fields, setFields] = useState<FieldType[]>([
    { label: "Staff Name", name: "staffName", value: "", isEditing: false },
    { label: "Designation", name: "designation", value: "", isEditing: false },
    { label: "Nominal", name: "nominal", value: "", isEditing: false },
    { label: "Ext No", name: "extNo", value: "", isEditing: false },
    { label: "Email", name: "email", value: "", isEditing: false },
    { label: "Phone No", name: "phoneNo", value: "", isEditing: false },
  ]);

  const { control, handleSubmit, setValue } = useForm<FormData>();

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

  const handleChange = (name: string, newValue: string) => {
    setFields(
      fields.map((field) =>
        field.name === name ? { ...field, value: newValue } : field
      )
    );
    setValue(name as keyof FormData, newValue);
  };

  const handleSave = (index: number) => {
    toggleEdit(index);
  };

  const onSubmit = (data: FormData) => {
    console.log("Submitting profile data:", data);
    // Here you would typically submit the data to your backend
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <div className="bg-red-900 h-32"></div>
      <div className="relative px-4 pt-16 pb-8">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
          <div className="relative w-32 h-32 bg-muted rounded-full overflow-hidden group">
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
        <p className="text-muted-foreground text-center mb-6">
          {fields[1].value || "Add designation"}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field, index) => (
            <div key={index} className="relative">
              <Label
                htmlFor={field.name}
                className="block text-sm font-medium text-foreground mb-1"
              >
                {field.label}
              </Label>
              <Controller
                name={field.name as keyof FormData}
                control={control}
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                  <div className="flex">
                    {field.isEditing ? (
                      <>
                        <Input
                          type="text"
                          id={field.name}
                          value={value}
                          onChange={(e: any) => {
                            onChange(e);
                            handleChange(field.name, e.target.value);
                          }}
                          className="w-full"
                          placeholder={`Enter ${field.label}`}
                        />
                        <button
                          type="button"
                          onClick={() => handleSave(index)}
                          className="ml-2 text-green-600 hover:text-green-800"
                          aria-label="Save"
                        >
                          <Check size={20} />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleEdit(index)}
                          className="ml-2 text-destructive hover:text-destructive/80"
                          aria-label="Cancel"
                        >
                          <X size={20} />
                        </button>
                      </>
                    ) : (
                      <>
                        {value ? (
                          <Input
                            type="text"
                            id={field.name}
                            value={value}
                            readOnly
                            className="w-full bg-muted"
                          />
                        ) : (
                          <button
                            type="button"
                            onClick={() => toggleEdit(index)}
                            className="w-full bg-muted text-muted-foreground border border-input rounded-md py-2 px-3 text-left hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            Add {field.label}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => toggleEdit(index)}
                          className="ml-2 text-primary hover:text-primary/80"
                          aria-label={value ? "Edit" : "Add"}
                        >
                          {value ? <PenSquare size={20} /> : <Plus size={20} />}
                        </button>
                      </>
                    )}
                  </div>
                )}
              />
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <Button
            type="submit"
            className="w-full md:w-auto bg-red-900 hover hover:bg-gray-600"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </form>
  );
}
