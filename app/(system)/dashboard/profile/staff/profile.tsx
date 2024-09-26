"use client";
import { useState, useRef, useEffect } from "react";
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
  displayName: string;
  title?: string;
  designation: string;
  nominal: string;
  extNo: string;
  isApproved?: boolean;
  emails: { id: string; email: string }[];
  telephones: { id: string; phoneNumber: string }[];
};

export default function Component() {
  const [data, setData] = useState<FormData | null>(null);
  const [fields, setFields] = useState<FieldType[]>([]); // Set fields to empty initially
  const { control, handleSubmit, setValue } = useForm<FormData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/staff-profile/8d5d9ab6-6394-4378-a9f2-fab7f0922de3`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Update fields when data is fetched
  useEffect(() => {
    if (data) {
      setFields([
        {
          label: "Staff Name",
          name: "staffName",
          value: data.displayName || "",
          isEditing: false,
        },
        {
          label: "Designation",
          name: "designation",
          value: data.designation || "",
          isEditing: false,
        },
        {
          label: "Nominal",
          name: "nominal",
          value: data.nominal || "",
          isEditing: false,
        },
        {
          label: "Ext No",
          name: "extNo",
          value: data.extNo || "",
          isEditing: false,
        },
        {
          label: "Email",
          name: "email",
          value: data.emails[0].email || "",
          isEditing: false,
        },
        {
          label: "Phone No",
          name: "phoneNo",
          value: data.telephones[0].phoneNumber || "",
          isEditing: false,
        },
      ]);

      // Set form default values
      setValue("displayName", data.displayName);
      setValue("designation", data.designation);
      setValue("nominal", data.nominal);
      setValue("extNo", data.extNo);
      setValue("emails", data.emails);
      setValue("telephones", data.telephones);
    }
  }, [data, setValue]);

  const [profileImage, setProfileImage] = useState("/users/generalUser.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const onSubmit = async (data: FormData) => {
    console.log("Submitting profile data:", data);
    const res = await fetch(
      `http://localhost:3001/staff-profile?id=8d5d9ab6-6394-4378-a9f2-fab7f0922de3`,
      {
        method: "PATCH",
        body: JSON.stringify({
          data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    );

    const user = await res.json();
    if (!res.ok) {
      alert("update failed");
    }
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
          {fields[0]?.value || "Add Name"}
        </h2>
        <p className="text-muted-foreground text-center mb-6">
          {fields[1]?.value || "Add designation"}
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
                defaultValue={field.value} // Ensure default value is set
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
                            <Plus size={16} className="inline-block mr-2" />
                            {field.label}
                          </button>
                        )}
                        {value && (
                          <button
                            type="button"
                            onClick={() => toggleEdit(index)}
                            className="ml-2 text-muted-foreground hover:text-muted-foreground/80"
                            aria-label="Edit"
                          >
                            <PenSquare size={20} />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )}
              />
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <Button type="submit">Save changes</Button>
        </div>
      </div>
    </form>
  );
}
