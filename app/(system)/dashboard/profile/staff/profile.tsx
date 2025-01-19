'use client'

import { Avatar} from "@heroui/avatar";
import {  AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Phone, Trash2, Upload } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { staffProfileData } from "@/utils/types"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Axios from "@/config/axios";


// export default function StaffProfile() {
//   const [staffData, setStaffData] = useState({
//     "staff email": "s19462@sci.pdn.ac.lk",
//     "extNo": "ST102",
//     staffProfile: {
//       displayName: "sanidu kich",
//       title: "DR",
//       designation: "Director",
//       nominal: "Ph.D. (UK), M.Eng. (Thailand), B.Sc(Moratuwa)",
//       emails: [
//         { email: "s19464@sci.pdn.ac.lk" },
//         { email: "s19465@sci.pdn.ac.lk" }
//       ],
//       telephones: [
//         { phoneNumber: "0787053108" },
//         { phoneNumber: "0787053107" }
//       ]
//     }
//   })

export default function StaffProfile() {
  const [staffData, setStaffData] = useState<staffProfileData>();
   const { data:session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.access_token){
      return;
    }
    // Fetch staffProfile from the server
    const fetchStaffProfile = async () => {
      const response = await Axios.get(
        `/user/staff/me`,{
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      const data = await response.data;
      setStaffData(data);
    };
    fetchStaffProfile();
  }, [session]);


  const [profileImage, setProfileImage] = useState<string>("/placeholder.svg")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setStaffData(prev => ({
      ...prev,
      staffProfile: {
        ...prev!.staffProfile,
        [field]: value
      }
    }))
  }

  const handleEmailChange = (index: number, value: string) => {
    setStaffData(prev => ({
      ...prev,
      staffProfile: {
        ...prev!.staffProfile,
        emails: prev!.staffProfile.emails.map((email, i) => 
          i === index ? { email: value } : email
        )
      }
    }))
  }

  const handlePhoneChange = (index: number, value: string) => {
    setStaffData(prev => ({
      ...prev,
      staffProfile: {
        ...prev!.staffProfile,
        telephones: prev!.staffProfile.telephones.map((phone, i) => 
          i === index ? { phoneNumber: value } : phone
        )
      }
    }))
  }

  const removeEmail = (index: number) => {
    if (staffData?.staffProfile.emails??[].length > 1) {
      //{(staffData?.staffProfile.emails??[]).length < 2 &&
      setStaffData(prev => ({
        ...prev,
        staffProfile: {
          ...prev!.staffProfile,
          emails: prev!.staffProfile.emails.filter((_, i) => i !== index)
        }
      }))
    }
  }

  const removeTelephone = (index: number) => {
    if (staffData?.staffProfile.telephones??[].length > 1) {
      //{(staffData?.staffProfile.emails??[]).length < 2 &&
      setStaffData(prev => ({
        ...prev,
        staffProfile: {
          ...prev!.staffProfile,
          telephones: prev!.staffProfile.telephones.filter((_, i) => i !== index)
        }
      }))
    }
  }

  const addEmail = () => {
    if (staffData?.staffProfile.emails??[].length < 2) {
      ////{(staffData?.staffProfile.emails??[]).length < 2 &&
      setStaffData(prev => ({
        ...prev,
        staffProfile: {
          ...prev!.staffProfile,
          emails: [...prev!.staffProfile.emails, { email: "" }]
        }
      }))
    }
  }

  const addTelephone = () => {
    if (staffData?.staffProfile.telephones??[].length < 2) {
      //{(staffData?.staffProfile.emails??[]).length < 2 &&
      setStaffData(prev => ({
        ...prev,
        staffProfile: {
          ...prev!.staffProfile,
          telephones: [...prev!.staffProfile.telephones, { phoneNumber: "" }]
        }
      }))
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="h-48 bg-[#862727]" />
      
      <div className="max-w-3xl mx-auto px-4 -mt-24">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col items-center -mt-20 mb-8">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage src={profileImage} />
                  <AvatarFallback>SK</AvatarFallback>
                </Avatar>
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
                <p className="text-sm text-muted-foreground">Staff Email: {staffData?.email}</p>
                <p className="text-sm text-muted-foreground">Ext No: {staffData?.staffProfile.extNo}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={staffData?.staffProfile.displayName}
                    onChange={(e) => handleInputChange('displayName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Select
                    value={staffData?.staffProfile.title}
                    onValueChange={(value) => handleInputChange('title', value)}
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
                    onChange={(e) => handleInputChange('designation', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nominal">Qualifications</Label>
                  <Input
                    id="nominal"
                    value={staffData?.staffProfile.nominal}
                    onChange={(e) => handleInputChange('nominal', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Email Addresses</Label>
                  {(staffData?.staffProfile.emails??[]).length < 2 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={addEmail}
                    >
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
                          onChange={(e) => handleEmailChange(index, e.target.value)}
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
                  {(staffData?.staffProfile.telephones??[]).length < 2 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={addTelephone}
                    >
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
                          onChange={(e) => handlePhoneChange(index, e.target.value)}
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

              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

