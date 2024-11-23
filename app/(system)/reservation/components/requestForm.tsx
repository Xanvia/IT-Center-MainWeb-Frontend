"use client";

import { useState } from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
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

const formSchema = z.object({
  date: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional(),
  timeSlot: z.enum(["morning", "evening", "fullDay"], {
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

export function ReservationForm({
  date,
  setDate,
}: {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventDetails: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would typically send the data to your backend
    alert("Reservation submitted successfully!");
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Seminar Room 01</CardTitle>
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
                            <RadioGroupItem disabled value="morning" />
                          </FormControl>
                          <FormLabel className="font-normal ">
                            8 am-12 pm{" "}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="evening" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            1 pm-5 pm{" "}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="fullDay" />
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
