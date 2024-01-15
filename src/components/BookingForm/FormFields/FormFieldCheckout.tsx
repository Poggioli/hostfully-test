import { BookingSchema } from "@/components//BookingForm/useBookingForm";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FC, useMemo } from "react";
import { useFormContext } from "react-hook-form";

type FormFieldCheckoutProps = {
  unavailableDates: Date[]
}

const FormFieldCheckout: FC<FormFieldCheckoutProps> = ({ unavailableDates }) => {

  const { register, watch } = useFormContext<BookingSchema>()

  const isDisabled = useMemo(() => {
    return !watch('checkIn')
  }, [watch('checkIn')]);

  const minDate = useMemo(() => {
    const checkin: Date = watch('checkIn') || new Date();
    const minCheckout =  addDays(checkin, 1);
    return minCheckout
  }, [watch('checkIn')])

  return (
    <FormField
      {...register("checkOut")}
      disabled={isDisabled}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="w-fit">Check-out</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                  disabled={isDisabled}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date to your check-out</span>
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
                disabled={[(date) => date < minDate, ...unavailableDates]}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormFieldCheckout };
