"use client";

import { useEffect, useState } from "react";
import { Check, Edit, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@nextui-org/react";
import Axios from "@/config/axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";

// Types
type StaffState = "REGISTERED" | "REQUESTS";

type Staff = {
  id: string;
  name: string;
  email: string;
  image: string;
  designation: string;
};

type StaffRequest = {
  id: string;
  displayName: string;
  title: string;
  designation: string;
  nominal: string;
  extNo: string;

  requestBy: string;
  emails: [
    {
      email: string;
    }
  ];
  telephones: [
    {
      phoneNumber: string;
    }
  ];
};

const StaffPage: React.FC = () => {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [requestList, setRequestList] = useState<StaffRequest[]>([]);
  const [selectedTab, setSelectedTab] = useState<StaffState>("REGISTERED");
  const { data: session } = useSession();

  const deleteStaff = (staffId: string) => {
    try {
      Axios.delete(`/staff/${staffId}`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      setStaffList((prevStaffList) =>
        prevStaffList.filter((staff) => staff.id !== staffId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filteredStaffList = staffList.filter(
    (staff) => staff.designation === selectedTab
  );

  useEffect(() => {
    const fetchStaffList = async () => {
      try {
        const response = await Axios.get("/staff-profile", {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        const data = await response.data;
        setStaffList(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchStaffRequests = async () => {
      try {
        const response = await Axios.get("/staff-profile/requests", {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        const data = await response.data;
        setRequestList(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStaffList();
    fetchStaffRequests();
  }, []);

  return (
    <main className="w-full ">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-600">
          Staff Accounts
        </h1>
        <Tabs
          value={selectedTab}
          onValueChange={(value) => setSelectedTab(value as StaffState)}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="REGISTERED">Registered</TabsTrigger>
            <TabsTrigger value="REQUESTS">Requests</TabsTrigger>
          </TabsList>
          <TabsContent value={"REGISTERED"}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Profile</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Ext No</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaffList.map((staff, index) => (
                  <TableRow key={staff.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Avatar src={staff.image} name={staff.name} />
                        <div>
                          <p className="font-semibold">{staff.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{staff.designation}</TableCell>
                    <TableCell>{staff.email}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Eye className="h-5 w-5 cursor-pointer" />
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>{staff.name}</DialogTitle>
                              <DialogDescription>
                                Designation: {staff.designation}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 pt-2">
                              <div className="flex gap-3 items-center">
                                <Label className=" text-gray-600 font-bold">
                                  Email:
                                </Label>
                                <p className="text-right text-small">
                                  {staff.email}
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Trash2
                          onClick={() => deleteStaff(staff.id)}
                          className="h-5 w-5 text-red-600 cursor-pointer"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value={"REQUESTS"}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Ext No</TableHead>
                  <TableHead>Requested By</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requestList.map((staff, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Avatar name={staff.displayName} />
                      </div>
                    </TableCell>
                    <TableCell>{staff.displayName}</TableCell>
                    <TableCell>{staff.designation}</TableCell>
                    <TableCell>{staff.extNo}</TableCell>
                    <TableCell>{staff.requestBy}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 items-center">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Eye className="h-5 w-5 cursor-pointer" />
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>{staff.displayName}</DialogTitle>
                              <DialogDescription>
                                Designation: {staff.designation}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 pt-2">
                              <div className="flex gap-3 items-center">
                                <Label className=" text-gray-600 font-bold">
                                  Email:
                                </Label>
                                <p className="text-right text-small">
                                  {staff.emails[0].email}
                                </p>
                              </div>
                              <div className="flex gap-3 items-center">
                                <Label className=" text-gray-600 font-bold">
                                  Telephone:
                                </Label>
                                <p className="text-right text-small">
                                  {staff.telephones[0].phoneNumber}
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" className="bg-green-500 text-white">
                          Approve
                        </Button>
                        <Button size="sm" className="bg-red-500 text-white">
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default StaffPage;
