"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { Camera, Loader } from "lucide-react";
import { delay, getAbsoluteImageUrl } from "@/utils/common";
import Axios from "@/config/axios";
import { toast } from "@/hooks/use-toast";

export default function AccountSettings() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
  });
  const { data: session, status } = useSession();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleProfileUpdate = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault(); // Prevent default form submission
    const file = event.target.files;
    if (file) {
      const formData = new FormData();
      formData.append("user", file[0]);
      try {
        //axios use instead of fetch
        const response = await Axios.post("/user/upload-img", formData, {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            "Content-Type": "multipart/form-data",
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
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the password change request to your backend
    console.log("Password change requested:", passwords);
  };

  const handleDeleteAccount = () => {
    // Here you would typically send the account deletion request to your backend
    console.log("Account deletion requested");
  };

  useEffect(() => {
    if (session?.user) {
      setPhotoPreview(getAbsoluteImageUrl(session.user.image) || null);
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-600">
          Account Settings
        </h1>
        {/* centered loading spinner */}
        <div className="flex justify-center items-center h-20 animate-spin">
          <Loader />
        </div>
      </div>
    );
  } else
    return (
      <div className="container mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-600">
          Account Settings
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your account's profile information and email address.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-4">
                  <Avatar
                    src={photoPreview || ""}
                    alt={user.name}
                    fallback={user.name.charAt(0)}
                    className="h-40 w-40"
                  ></Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => hiddenFileInput.current?.click()}
                  >
                    <Camera />
                  </Button>
                  <input
                    id="profilePhotoInput"
                    type="file"
                    accept="image/*"
                    ref={hiddenFileInput}
                    onChange={handleProfileUpdate}
                    className="hidden"
                  />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                    />
                  </div>
                  <Button type="submit">Save</Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Ensure your account is using a long, random password to stay
              secure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords({ ...passwords, current: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords({ ...passwords, new: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirm: e.target.value })
                  }
                />
              </div>
              <Button type="submit">Change Password</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delete Account</CardTitle>
            <CardDescription>
              Permanently delete your account and all of its contents from the
              platform. This action is not reversible, so please continue with
              caution.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={session?.user.role === "S_ADMIN"}
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    );
}
