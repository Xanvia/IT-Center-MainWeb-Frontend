"use client";

import { useEffect, useState } from "react";
import { format, isSameDay } from "date-fns";
import { Calendar as CalendarIcon, Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/utils/common";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { DateRange } from "react-day-picker";
import Axios from "@/config/axios";
import { Event } from "@/utils/types";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  date: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional(),
  timeSlot: z.enum(["MORNING", "AFTERNOON", "FULLDAY"], {
    required_error: "Please select a time slot.",
  }),
  eventName: z.string().min(2, {
    message: "Event name must be at least 2 characters.",
  }),
  eventDetails: z.string().optional(),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
});

type reservationData = {
  name: string;
  location: string;
  feeRatePerHour: number;
};

export function ReservationForm({
  date,
  reservationId,
}: {
  date: DateRange | undefined;
  reservationId: string;
}) {
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  const validateFields = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      setOpen(true);
    }
  };

  const [events, setEvents] = useState<Event[]>([]);
  const [reservation, setReservation] = useState<reservationData>();
  const [timeLocked, setTimeLocked] = useState<boolean[]>([true, true, true]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      setLoading(true);
      const res = await Axios.post(
        `/reserve-records`,
        {
          eventName: values.eventName,
          startingDate: format(date!.from!, "yyyy-MM-dd"),
          endingDate: format(date!.to!, "yyyy-MM-dd"),
          timeSlot: values.timeSlot,
          description: values.eventDetails,
          phoneNumber: values.phoneNumber,
          reservationId: reservationId,
          charges: charges(values.timeSlot),
        },
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
      router.push("/reservation/my-reservations");
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Something went wrong! Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await Axios.get(
          `/reservations/${reservationId}/records`,
          {
            headers: {
              Authorization: `Bearer ${session?.access_token}`,
            },
          }
        );
        const data = await response.data;
        console.log(data);
        setReservation({
          name: data.name,
          location: data.location,
          feeRatePerHour: data.feeRatePerHour,
        });
        setEvents(
          data.records?.map((event: any) => ({
            title: event.eventName,
            start: event.startingDate,
            end: event.endingDate,
            timeSlot: event.timeSlot,
          }))
        );
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          description: "Something went wrong! Please try again.",
        });
      }
    };

    fetchEvents();
  }, [reservationId]);

  useEffect(() => {
    if (date) {
      setTimeLocked([false, false, false]);
      const taken = (timeSlot: "MORNING" | "AFTERNOON" | "FULLDAY") => {
        return events.some((event) => {
          const endDate = new Date(event.end);
          for (
            let currentDate = new Date(event.start);
            currentDate <= endDate;
            currentDate.setDate(currentDate.getDate() + 1)
          ) {
            if (
              isSameDay(date.from!, currentDate) &&
              timeSlot === event.timeSlot
            ) {
              return true;
            }
          }
          return false;
        });
      };
      if (taken("MORNING")) {
        setTimeLocked((prev) => [true, prev[1], true]);
        form.resetField("timeSlot");
      }
      if (taken("AFTERNOON")) {
        setTimeLocked((prev) => [prev[0], true, true]);
        form.resetField("timeSlot");
      }
      if (taken("FULLDAY")) {
        setTimeLocked([true, true, true]);
        form.resetField("timeSlot");
      }
    }
  }, [date, events]);

  const charges = (timeSlot: string) => {
    var amount = 0;
    if (!reservation) {
      return 0;
    }
    if (timeSlot === "FULLDAY") {
      amount = reservation.feeRatePerHour * 8;
    } else {
      amount = reservation.feeRatePerHour * 4;
    }
    date?.from &&
      date?.to &&
      (amount = amount * (date.to.getDate() - date.from.getDate() + 1));
    return amount;
  };
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{reservation?.name}</CardTitle>
        <CardDescription>
          Select an available date first and provide other details for your
          event.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <FormField
                control={form.control}
                name="date"
                disabled
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Selected Date/ Date Range</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                              "w-[300px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon />
                            {date?.from ? (
                              date.to ? (
                                <>
                                  {format(date.from, "LLL dd, y")} -{" "}
                                  {format(date.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(date.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeSlot"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Time Slot</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-5 space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="MORNING"
                              className="disabled:opacity-10"
                              disabled={timeLocked[0]}
                            />
                          </FormControl>
                          <FormLabel className="font-normal ">
                            8 am-12 pm{" "}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="AFTERNOON"
                              className="disabled:opacity-10"
                              disabled={timeLocked[1]}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            1 pm-5 pm{" "}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value="FULLDAY"
                              className="disabled:opacity-10"
                              disabled={timeLocked[2]}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Full Day
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="eventName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide a name for your event.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eventDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter event details"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Add any additional details about your event.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Enter your mobile number"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a valid method to contact you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="button" onClick={validateFields}>
              Request Reservation
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Confirm Your Reservation</DialogTitle>
                  <DialogDescription>
                    Make sure the details are correct before submitting.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 pt-2">
                  <div className="flex justify-between items-center">
                    <Label className=" text-gray-600 font-medium">
                      Reservation Name:
                    </Label>
                    <p className="text-right text-small">{reservation?.name}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Label className="font-medium text-gray-600">
                    Event Name:
                  </Label>
                  <p className="text-right text-small">
                    {form.watch("eventName")}
                  </p>
                </div>
                <div className="flex justify-between items-start">
                  <Label className="font-medium text-gray-600">
                    Reservation Date:
                  </Label>
                  <div className="text-right text-small">
                    <p>From: {date?.from?.toDateString()}</p>
                    <p>To: {date?.to?.toDateString()}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <Label className="font-medium text-gray-600">
                    Time Slot:
                  </Label>
                  <p className="text-right text-small">
                    {form.watch("timeSlot") === "MORNING"
                      ? "8 am - 12 pm"
                      : form.watch("timeSlot") === "AFTERNOON"
                      ? "1 pm - 5 pm"
                      : "Full Day"}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <Label className="font-medium text-gray-600">
                    Estimated Charge:
                  </Label>
                  <p className="text-right font-semibold ">
                    LKR {charges(form.watch("timeSlot"))}
                  </p>
                </div>
                <p className="text-xs italic text-gray-600">
                  You will be required to pay this amount upon confirmation by
                  the IT Center. condition applied*
                </p>

                <p className="text-xs italic text-yellow-600">
                  If you are from Acedamic staff UOP, this amount will not be
                  charged. Please contact IT-Center after confirmation.
                </p>

                <DialogFooter>
                  <Button
                    disabled={loading}
                    type="button"
                    className="bg-red-600"
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    Process
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </form>
        </Form>
        <div className={`${loading ? "block" : "hidden"}`}>
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[999]">
            <Loader className="text-gray-200 animate-spin h-10 w-10" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
