"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Reservation } from "@/utils/types";
import { toast } from "@/hooks/use-toast";
import Axios from "@/config/axios";
import { delay } from "@/utils/common";
import { useSession } from "next-auth/react";

interface ReservationModalProps {
  reservation?: Reservation | null;
  onClose: () => void;
  onSave: (reservation: Reservation) => void;
}

export default function ReservationModal({
  reservation,
  onClose,
  onSave,
}: ReservationModalProps) {
  const [formData, setFormData] = useState<Reservation>({
    id: "",
    name: "",
    description: "",
    images: [],
    seatLimit: 0,
    noOfComputers: 0,
    availableSoftwares: "",
    equipment: "",
    isAC: true,
    bestCase: "",
    location: "",
    feeRatePerHour: 0,
  });
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (reservation) {
      setFormData(reservation);
    }
  }, [reservation]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setIsUploadingImages(true);
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("reservation", files[i]);
      }
      try {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/reservations/upload`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${session?.access_token}`,
            },
          }
        );
        if (result.ok) {
          const data = await result.json();
          console.log(data);
          await delay(3000);
          setFormData((prev) => ({
            ...prev,
            images: [
              ...prev.images,
              ...data.files.map(
                (file: { path: string }) =>
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/${file.path}`
              ),
            ],
          }));
          toast({ description: "Images uploaded successfully" });
        }
      } catch (error) {
        console.error(error);
        toast({ description: "Failed to upload images" });
      } finally {
        setIsUploadingImages(false);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isAC: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert numeric fields to numbers
    const convertedFormData = {
      ...formData,
      seatLimit: Number(formData.seatLimit),
      noOfComputers: Number(formData.noOfComputers),
      feeRatePerHour: Number(formData.feeRatePerHour),
    };

    const url = reservation ? `reservations/${reservation.id}` : "reservations";
    console.log("formData", convertedFormData);
    let res;
    try {
      if (reservation) {
        res = await Axios.put(url, convertedFormData, {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        console.log(res.data);
        onSave(formData);
      } else {
        const { id, ...data } = convertedFormData;
        res = await Axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        });
        console.log(res.data);
        onSave(res.data);
      }

      toast({
        title: "Reservation saved.",
        description: "Your reservation has been saved successfully",
      });
      onClose();
      console.log("convertedFormData", convertedFormData, res.data);
    } catch (error: any) {
      console.log(error.response.data);
      toast({
        title: "Something went wrong!",
        description: "Your reservation has not been saved successfully",
      });
    }
  };

  return (
    <div className="fixed top-0 bottom-0 right-0 left-28 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto z-10">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {reservation ? "Edit" : "Add"} Reservation
          </h2>
          <Button variant="ghost" onClick={onClose}>
            <X />
          </Button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="seatLimit">Seat Limit</Label>
                <Input
                  id="seatLimit"
                  name="seatLimit"
                  type="number"
                  value={formData.seatLimit}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="computers">Number of Computers</Label>
                <Input
                  id="computers"
                  name="noOfComputers"
                  type="number"
                  value={formData.noOfComputers}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="availableSoftwares">Available Software</Label>
                <Input
                  id="availableSoftwares"
                  name="availableSoftwares"
                  value={formData.availableSoftwares}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="equipment">Equipment</Label>
                <Input
                  id="equipment"
                  name="equipment"
                  value={formData.equipment}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="bestCase">Best Case</Label>
                <Input
                  id="bestCase"
                  name="bestCase"
                  value={formData.bestCase}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="feeRatePerHour">Fee per Hour</Label>
                <Input
                  id="feeRatePerHour"
                  name="feeRatePerHour"
                  type="number"
                  value={formData.feeRatePerHour}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="hasAC"
                  checked={formData.isAC}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="hasAC">Has AC</Label>
              </div>
              <div>
                <Label htmlFor="image">Images</Label>

                <div className="flex m-1 space-x-2 overflow-auto">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative ">
                      <img
                        src={image}
                        alt={`image:${index}`}
                        className="h-20"
                      />
                      <div className="absolute top-0 right-1">
                        <p
                          className=" text-red-500 cursor-pointer text-sm font-bold"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              images: prev.images.filter(
                                (img) => img !== image
                              ),
                            }))
                          }
                        >
                          x
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Input
                  id="image"
                  name="image"
                  type="file"
                  onChange={handleImageChange}
                  multiple
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="bg-maroon"
              type="submit"
              disabled={isUploadingImages}
            >
              {isUploadingImages ? "Uploading..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
