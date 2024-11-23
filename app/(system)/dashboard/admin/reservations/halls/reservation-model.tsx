"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface Reservation {
  id: string;
  name: string;
  description: string;
  images: string[];
  seatLimit: number;
  computers: number;
  availableSoftware: string;
  equipment: string;
  hasAC: boolean;
  bestCase: string;
  location: string;
  feePerHour: number;
}

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
    computers: 0,
    availableSoftware: "",
    equipment: "",
    hasAC: false,
    bestCase: "",
    location: "",
    feePerHour: 0,
  });

  useEffect(() => {
    if (reservation) {
      setFormData(reservation);
    }
  }, [reservation]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, hasAC: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
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
                  name="computers"
                  type="number"
                  value={formData.computers}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="availableSoftware">Available Software</Label>
                <Input
                  id="availableSoftware"
                  name="availableSoftware"
                  value={formData.availableSoftware}
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
                <Label htmlFor="feePerHour">Fee per Hour</Label>
                <Input
                  id="feePerHour"
                  name="feePerHour"
                  type="number"
                  value={formData.feePerHour}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="hasAC"
                  checked={formData.hasAC}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="hasAC">Has AC</Label>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
