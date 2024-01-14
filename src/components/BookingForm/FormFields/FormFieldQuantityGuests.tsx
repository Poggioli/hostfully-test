import { BookingSchema } from "@/components/BookingForm/useBookingForm";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

const FormFieldQuantityGuests: FC = () => {

  const { register } = useFormContext<BookingSchema>()

  return (
    <FormField
      {...register("quantityGuests")}
      name="quantityGuests"
      render={({ field }) => (
        <FormItem className="max-w-[240px]">
          <FormLabel className="w-fit">Guests</FormLabel>
          <FormControl>
            <Input placeholder="number of guests" type="number" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormFieldQuantityGuests };
