"use client";

import { useEffect, useState } from "react";
import { Edit, Eye, MoreVertical, Trash2 } from "lucide-react";
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
  DialogHeader,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Role } from "@/utils/nextauth";

// Types
type StaffState = "REGISTERED" | "REQUESTS";

type Staff = {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  staffProfile?: {
    id: string;
    title: string;
    designation: string;
    extNo: string;
  };
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
  const [newExtNo, setNewExtNo] = useState("");
  const { data: session } = useSession();

  if (session?.user?.role !== "ADMIN" && session?.user?.role !== "S_ADMIN")
    return (
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Staff Accounts</h1>
        <div className="grid gap-4">
          <p>Sorry :( You are not Authorized to view this page.</p>
        </div>
      </div>
    );

  const approveStaff = async (staffEmail: string) => {
    try {
      await Axios.post(
        `/user/convert/staff`,
        {
          requestBy: staffEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const rejectStaff = async (profileId: string) => {
    try {
      await Axios.delete(`/staff-profile/${profileId}`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      // update the request list
      setRequestList((requests) =>
        requests.filter((request) => request.id !== profileId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const updateExtNO = async (profileId: string, extNo: string) => {
    try {
      await Axios.patch(
        `/staff-profile/${profileId}`,
        {
          extNo: extNo,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      {
        selectedTab === "REGISTERED"
          ? setStaffList((staffs) =>
              staffs.map((staff) =>
                staff.staffProfile?.id === profileId
                  ? {
                      ...staff,
                      staffProfile: { ...staff.staffProfile, extNo: extNo },
                    }
                  : staff
              )
            )
          : setRequestList((requests) =>
              requests.map((request) =>
                request.id === profileId
                  ? { ...request, extNo: extNo }
                  : request
              )
            );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStaff = async (staffId: string) => {
    try {
      await Axios.delete(`/user/staff/${staffId}`, {
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

  const promoteStaff = async (staffId: string) => {
    try {
      await Axios.post(
        `/user/convert/admin`,
        {
          requestId: staffId,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      // update the staff list
      setStaffList((staffs) =>
        staffs.map((staff) =>
          staff.id === staffId ? { ...staff, role: "ADMIN" } : staff
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const demoteAdmin = async (staffId: string) => {
    try {
      await Axios.post(
        `/user/demote/staff`,
        {
          requestId: staffId,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      // update the staff list
      setStaffList((staffs) =>
        staffs.map((staff) =>
          staff.id === staffId ? { ...staff, role: "STAFF" } : staff
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!session) return;
    const fetchStaffList = async () => {
      try {
        const response = await Axios.get("/user/staff", {
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
  }, [session]);

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
                  <TableHead>Role</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staffList.map((staff, index) => (
                  <TableRow key={staff.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 items-center">
                        <Avatar src={staff.image} name={staff.name} />
                        <div>
                          <p className="font-semibold">
                            {staff.staffProfile?.title + " " + staff.name}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{staff.staffProfile?.designation}</TableCell>
                    <TableCell>{staff.email}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {staff.staffProfile?.extNo}
                        <Dialog
                          onOpenChange={() =>
                            setNewExtNo(staff.staffProfile!.extNo)
                          }
                        >
                          <DialogTrigger asChild>
                            <Edit className="h-4 w-4 cursor-pointer" />
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Edit the Ext No</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 pt-2">
                              <Label>Ext No</Label>
                              <input
                                value={newExtNo}
                                onChange={(e) => setNewExtNo(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                              />
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button
                                  onClick={() =>
                                    updateExtNO(
                                      staff.staffProfile!.id,
                                      newExtNo
                                    )
                                  }
                                  type="submit"
                                  className="bg-red-600"
                                >
                                  Update
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                    <TableCell>{staff.role}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 items-center">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Trash2 className="h-5 w-5 text-red-600 cursor-pointer" />
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Confirmation</DialogTitle>
                            </DialogHeader>
                            <div>
                              <p>
                                Are you sure you want to delete this staff
                                Account?
                              </p>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button
                                  onClick={() => deleteStaff(staff.id)}
                                  type="submit"
                                  className="bg-red-600"
                                >
                                  Delete
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        {/* drop down to select make admin and remove admin */}

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <MoreVertical className="h-4 w-4 cursor-pointer" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-10">
                            <DropdownMenuLabel className="text-sm">
                              Convert User
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              disabled={staff.role !== "STAFF"}
                              onSelect={(e) => e.preventDefault()}
                            >
                              <div>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <span>to Admin</span>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Confirmation</DialogTitle>
                                    </DialogHeader>
                                    <div>
                                      <p>
                                        Are you sure you want to Promote this
                                        staff Account to Admin Account?
                                      </p>
                                    </div>
                                    <DialogFooter>
                                      <DialogClose asChild>
                                        <Button
                                          onClick={() => promoteStaff(staff.id)}
                                          type="submit"
                                          className="bg-red-600"
                                        >
                                          Promote
                                        </Button>
                                      </DialogClose>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              disabled={staff.role !== "ADMIN"}
                              onSelect={(e) => e.preventDefault()}
                            >
                              <div>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <span>to Staff</span>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Confirmation</DialogTitle>
                                    </DialogHeader>
                                    <div>
                                      <p>
                                        Are you sure you want to Demote this
                                        Admin Account to Staff Account?
                                      </p>
                                    </div>
                                    <DialogFooter>
                                      <DialogClose asChild>
                                        <Button
                                          onClick={() => demoteAdmin(staff.id)}
                                          type="submit"
                                          className="bg-red-600"
                                        >
                                          Demote
                                        </Button>
                                      </DialogClose>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
                    <TableCell>
                      <div className="flex gap-2">
                        {staff.extNo}
                        <Dialog onOpenChange={() => setNewExtNo(staff.extNo)}>
                          <DialogTrigger asChild>
                            <Edit className="h-4 w-4 cursor-pointer" />
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Edit the Ext No</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 pt-2">
                              <Label>Ext No</Label>
                              <input
                                value={newExtNo}
                                onChange={(e) => setNewExtNo(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                              />
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button
                                  onClick={() =>
                                    updateExtNO(staff.id, newExtNo)
                                  }
                                  type="submit"
                                  className="bg-red-600"
                                >
                                  Update
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                    <TableCell>{staff.requestBy}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 items-center">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Eye className="h-5 w-5 cursor-pointer" />
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>
                                {staff.title + ". " + staff.displayName}
                              </DialogTitle>
                              <DialogDescription>
                                Designation: {staff.designation}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 pt-2">
                              <div className="flex gap-3 items-center">
                                <Label className=" text-gray-600 font-bold">
                                  Email:
                                </Label>
                                <p className="text-left text-small">
                                  {staff.emails.map((email) => (
                                    <div>{email.email}</div>
                                  ))}
                                </p>
                              </div>
                              <div className="flex gap-3 items-center">
                                <Label className=" text-gray-600 font-bold">
                                  Nominal:
                                </Label>
                                <p className="text-left text-small">
                                  {staff.nominal}
                                </p>
                              </div>
                              <div className="flex gap-3 items-center">
                                <Label className=" text-gray-600 font-bold">
                                  Telephone:
                                </Label>
                                <p className="text-left text-small">
                                  {staff.telephones.map((telephone) => (
                                    <div>{telephone.phoneNumber}</div>
                                  ))}
                                </p>
                              </div>
                              <div className="flex gap-3 items-center">
                                <Label className=" text-gray-600 font-bold">
                                  Ext No:
                                </Label>
                                <p className="text-left text-small">
                                  {staff.extNo}
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          onClick={() => approveStaff(staff.requestBy)}
                          className="bg-green-500 text-white"
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() => rejectStaff(staff.id)}
                          size="sm"
                          className="bg-red-500 text-white"
                        >
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
