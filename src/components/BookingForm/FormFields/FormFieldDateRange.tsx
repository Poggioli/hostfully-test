import { BookingSchema } from "@/components//BookingForm/useBookingForm";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FC, useState } from "react";
import { DateRange } from "react-day-picker";
import { useFormContext } from "react-hook-form";

type FormFieldDateRangeProps = {
  unavailableDates: Date[]
}

const FormFieldDateRange: FC<FormFieldDateRangeProps> = ({ unavailableDates }) => {

  const { setValue, getValues, formState } = useFormContext<BookingSchema>()

  const [date, setDate] = useState<DateRange | undefined>({
    from: getValues("checkIn"),
    to: getValues("checkOut"),
  });

  const onSelect = (value: DateRange | undefined) => {
    setDate(value);

    if (!value) {
      setDate({
        from: getValues("checkIn"),
        to: getValues("checkOut"),
      });
    }

    if (value?.from) {
      setValue("checkIn", value.from)
    }

    if (value?.to) {
      setValue("checkOut", value.to)
    }
  }

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[240px] justify-between text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
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
            <CalendarIcon className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        {formState.errors.checkIn || formState.errors.checkOut ? (
          <FormMessage>{formState.errors.checkOut?.message}</FormMessage>
        ) : null}
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onSelect}
            numberOfMonths={1}
            disabled={[(date) => date < new Date(), ...unavailableDates]}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { FormFieldDateRange };
