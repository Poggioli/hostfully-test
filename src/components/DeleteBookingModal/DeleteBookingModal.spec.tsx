import * as bookingService from "@/service/Booking";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { DeleteBookingModal } from "./DeleteBookingModal";

jest.mock("@/service/Booking", () => ({
  useDeleteBooking: jest.fn()
}));

describe('DeleteBookingModal', () => {
  it(`GIVEN a booking to delete
      WHEN user confirm to delete that booking
      THEN should call API to delete passing the id`, async () => {
    const mutateMock = jest.fn();
    jest.spyOn(bookingService, 'useDeleteBooking')
      //@ts-ignore
      .mockReturnValueOnce({
        mutate: mutateMock
      });

    const { getByRole } = render(<DeleteBookingModal id={'id-1'} />);

    const triggerButton = getByRole('button', {
      name: 'Cancel'
    });

    act(() => fireEvent.click(triggerButton));

    await waitFor(() => {
      getByRole('alertdialog');
    });

    const confirmButton = getByRole('button', {
      name: 'Continue'
    });

    act(() => fireEvent.click(confirmButton));

    expect(mutateMock).toHaveBeenCalledTimes(1);
    expect(mutateMock).toHaveBeenCalledWith('id-1');
  });
})