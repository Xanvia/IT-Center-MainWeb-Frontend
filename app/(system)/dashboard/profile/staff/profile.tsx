"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Trash2, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { staffProfileData } from "@/utils/types";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Axios from "@/config/axios";
import { toast } from "@/hooks/use-toast";
import { delay, getAbsoluteImageUrl } from "@/utils/common";
import { Avatar } from "@nextui-org/react";

export default function StaffProfile() {
  const [staffData, setStaffData] = useState<staffProfileData>({
    email: "",
    image: "",
    staffProfile: {
      id: "",
      displayName: "",
      title: "",
      designation: "",
      nominal: "",
      extNo: "",
      emails: [{ email: "" }],
      telephones: [{ phoneNumber: "" }],
    },
  });
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.access_token) {
      return;
    }
    // Fetch staffProfile from the server
    const fetchStaffProfile = async () => {
      const response = await Axios.get(`/user/staff/me`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      const data = await response.data;
      setStaffData(data);
      setPhotoPreview(getAbsoluteImageUrl(data.image) || "");
    };
    fetchStaffProfile();
  }, [session]);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // upload profile image
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files;
    if (file) {
      const formData = new FormData();
      formData.append("user", file[0]);
      try {
        //axios use instead of fetch
        const response = await Axios.post("/user/upload-img", formData, {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            // Remove Content-Type header to let browser set it automatically
          },
        });
        const imageUrl = response.data.path;
        console.log(imageUrl);
        if (imageUrl) {
          toast({
            title: "Success",
            description: "Image uploaded successfully!",
          });
          await delay(3000);
          setPhotoPreview(process.env.NEXT_PUBLIC_BACKEND_URL + "/" + imageUrl);
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
        }
      } catch (error: any) {
        console.error("Staff profile image upload error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);

        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "There was a problem with your request.";
        toast({
          variant: "destructive",
          title: "Upload Failed",
          description: `Failed to upload image: ${errorMessage}`,
        });
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setStaffData((prev) => ({
      ...prev,
      staffProfile: {
        ...prev!.staffProfile,
        [field]: value,
      },
    }));
  };

  const handleEmailChange = (index: number, value: string) => {
    setStaffData((prev) => ({
      ...prev,
      staffProfile: {
        ...prev!.staffProfile,
        emails: prev!.staffProfile.emails.map((email, i) =>
          i === index ? { email: value } : email
        ),
      },
    }));
  };

  const handlePhoneChange = (index: number, value: string) => {
    setStaffData((prev) => ({
      ...prev,
      staffProfile: {
        ...prev!.staffProfile,
        telephones: prev!.staffProfile.telephones.map((phone, i) =>
          i === index ? { phoneNumber: value } : phone
        ),
      },
    }));
  };

  const removeEmail = (index: number) => {
    if (staffData?.staffProfile.emails ?? [].length > 1) {
      //{(staffData?.staffProfile.emails??[]).length < 2 &&
      setStaffData((prev) => ({
        ...prev,
        staffProfile: {
          ...prev!.staffProfile,
          emails: prev!.staffProfile.emails.filter((_, i) => i !== index),
        },
      }));
    }
  };

  const removeTelephone = (index: number) => {
    if (staffData?.staffProfile.telephones ?? [].length > 1) {
      //{(staffData?.staffProfile.emails??[]).length < 2 &&
      setStaffData((prev) => ({
        ...prev,
        staffProfile: {
          ...prev!.staffProfile,
          telephones: prev!.staffProfile.telephones.filter(
            (_, i) => i !== index
          ),
        },
      }));
    }
  };

  const addEmail = () => {
    if (staffData?.staffProfile.emails ?? [].length < 2) {
      ////{(staffData?.staffProfile.emails??[]).length < 2 &&
      setStaffData((prev) => ({
        ...prev,
        staffProfile: {
          ...prev!.staffProfile,
          emails: [...prev!.staffProfile.emails, { email: "" }],
        },
      }));
    }
  };

  const addTelephone = () => {
    if (staffData?.staffProfile.telephones ?? [].length < 2) {
      //{(staffData?.staffProfile.emails??[]).length < 2 &&
      setStaffData((prev) => ({
        ...prev,
        staffProfile: {
          ...prev!.staffProfile,
          telephones: [...prev!.staffProfile.telephones, { phoneNumber: "" }],
        },
      }));
    }
  };

  const handleSave = async () => {
    // Save the updated staff profile
    try {
      const data: any = staffData?.staffProfile;
      // make emails and phonenumbers as string array
      data.emails = data.emails.map((email: any) => email.email);
      data.telephones = data.telephones.map((phone: any) => phone.phoneNumber);
      await Axios.patch(`/staff-profile/${data.id}`, data, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      toast({
        title: "Success",
        description: "User has updeted succesfully!",
      });
    } catch (error) {
      console.error("Error updeting staff:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <div className="min-h-[80vh] bg-white">
      <div className="h-48 bg-[#862727]" />

      <div className="max-w-3xl mx-auto px-4 -mt-24">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col items-center -mt-20 mb-8">
              <div className="relative">
                <Avatar
                  src={photoPreview || "/users/generalUser.png"}
                  className="w-32 h-32 border-4 border-white shadow-lg"
                ></Avatar>
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-lg cursor-pointer"
                >
                  <Upload className="h-5 w-5" />
                </label>
                <Input
                  id="profile-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Staff Email: {staffData?.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  Ext No: {staffData?.staffProfile.extNo}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={staffData?.staffProfile.displayName}
                    onChange={(e) =>
                      handleInputChange("displayName", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Select
                    value={staffData?.staffProfile.title}
                    onValueChange={(value) => handleInputChange("title", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DR">DR</SelectItem>
                      <SelectItem value="MR">MR</SelectItem>
                      <SelectItem value="MRS">MRS</SelectItem>
                      <SelectItem value="MISS">MISS</SelectItem>
                      <SelectItem value="REV">REV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    value={staffData?.staffProfile.designation}
                    onChange={(e) =>
                      handleInputChange("designation", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nominal">Nominal</Label>
                  <Input
                    id="nominal"
                    value={staffData?.staffProfile.nominal}
                    onChange={(e) =>
                      handleInputChange("nominal", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Email Addresses</Label>
                  {(staffData?.staffProfile.emails ?? []).length < 2 && (
                    <Button variant="outline" size="sm" onClick={addEmail}>
                      Add Email
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    {staffData?.staffProfile.emails.map((email, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={email.email}
                          onChange={(e) =>
                            handleEmailChange(index, e.target.value)
                          }
                        />
                        {staffData?.staffProfile.emails.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeEmail(index)}
                            className="hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Phone Numbers</Label>
                  {(staffData?.staffProfile.telephones ?? []).length < 2 && (
                    <Button variant="outline" size="sm" onClick={addTelephone}>
                      Add Phone
                    </Button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    {staffData?.staffProfile.telephones.map((phone, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={phone.phoneNumber}
                          onChange={(e) =>
                            handlePhoneChange(index, e.target.value)
                          }
                        />
                        {staffData?.staffProfile.telephones.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeTelephone(index)}
                            className="hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end ">
                <Button
                  onClick={() => handleSave()}
                  className="hover:bg-[#3a3a3a] bg-[#862727] text-white"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
