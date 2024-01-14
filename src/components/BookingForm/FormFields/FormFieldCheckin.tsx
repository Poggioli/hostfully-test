import { BookingSchema } from "@/components/BookingForm/useBookingForm";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

type FormFieldCheckinProps = {
  unavailableDates: Date[]
}

const FormFieldCheckin: FC<FormFieldCheckinProps> = ({ unavailableDates }) => {

  const { register } = useFormContext<BookingSchema>()

  return (
    <FormField
      {...register("checkIn")}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="w-fit">Check-in</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date to your check-in</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={[(date) => date < new Date(), ...unavailableDates]}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormFieldCheckin };
