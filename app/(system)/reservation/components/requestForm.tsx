"use client";

import { useEffect, useState } from "react";
import { format, isSameDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventDetails: "",
    },
  });

  const [events, setEvents] = useState<Event[]>([]);
  const [reservation, setReservation] = useState<reservationData>();
  const [timeLocked, setTimeLocked] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
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
        },
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );
    } catch (error) {
      console.log("something went wrong!");
    }
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await Axios.get(
          `/reservations/${reservationId}/records`
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
      }
    };

    fetchEvents();
  }, [reservationId]);

  useEffect(() => {
    if (date) {
      setTimeLocked([false, false, false]);
      const taken = (timeSlot: "MORNING" | "AFTERNOON" | "FULLDAY") => {
        return events.some((event) => {
          return (
            isSameDay(date.from!, event.start) && timeSlot === event.timeSlot
          );
        });
      };
      if (taken("MORNING")) {
        setTimeLocked((prev) => [true, prev[1], true]);
      }
      if (taken("AFTERNOON")) {
        setTimeLocked((prev) => [prev[0], true, true]);
      }
      if (taken("FULLDAY")) {
        setTimeLocked([true, true, true]);
      }
    }
  }, [date]);

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

            <Button type="submit" className="w-full">
              Request Reservation
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
