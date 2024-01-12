import { expect, it, describe } from "vitest";
import {
  isBookingAtLeastForOneDay,
  isEndTimeGreatherThanStartTime,
  isNotOverlapping,
} from "./validateBooking";

describe("validateBooking", () => {
  describe("isEndTimeGreatherThanStartTime", () => {
    it(`GIVEN a end time as 12/01/2024
        WHEN start time is 13/01/2024
        THEN should return false`, () => {
      expect(
        isEndTimeGreatherThanStartTime(
          new Date(2024, 0, 13),
          new Date(2024, 0, 12)
        )
      ).toBe(false);
    });

    it(`GIVEN a end time as 14/01/2024
        WHEN start time is 12/01/2024
        THEN should return false`, () => {
      expect(
        isEndTimeGreatherThanStartTime(
          new Date(2024, 0, 12),
          new Date(2024, 0, 14)
        )
      ).toBe(true);
    });
  });

  describe("isBookingAtLeastForOneDay", () => {
    it(`GIVEN a start time as 12/01/2024
        WHEN end time is 13/01/2024
        THEN should return true`, () => {
      expect(
        isBookingAtLeastForOneDay(new Date(2024, 0, 12), new Date(2024, 0, 13))
      ).toBe(true);
    });

    it(`GIVEN a start time as 12/01/2024
        WHEN end time is 14/01/2024
        THEN should return true`, () => {
      expect(
        isBookingAtLeastForOneDay(new Date(2024, 0, 12), new Date(2024, 0, 14))
      ).toBe(true);
    });

    it(`GIVEN a start time as 12/01/2024
        WHEN end time is 12/01/2024
        THEN should return false`, () => {
      expect(
        isBookingAtLeastForOneDay(new Date(2024, 0, 12), new Date(2024, 0, 12))
      ).toBe(false);
    });
  });

  describe("isNotOverlapping", () => {
    const bookingStartTimeA = new Date(2024, 0, 12);
    const bookingEndTimeA = new Date(2024, 0, 20);

    it(`GIVEN two bookings
        WHEN booking B has the end time equal to start time booking A
        THEN should return false`, () => {
      const startTimeBookingB = new Date(2024, 0, 9);
      const endTimeBookingB = new Date(2024, 0, 12);
      expect(
        isNotOverlapping(
          bookingStartTimeA,
          bookingEndTimeA,
          startTimeBookingB,
          endTimeBookingB
        )
      ).toBe(false);
    });

    it(`GIVEN two bookings
        WHEN booking B has the end time is between start time and end time of booking A
        THEN should return false`, () => {
      const startTimeBookingB = new Date(2024, 0, 9);
      const endTimeBookingB = new Date(2024, 0, 14);
      expect(
        isNotOverlapping(
          bookingStartTimeA,
          bookingEndTimeA,
          startTimeBookingB,
          endTimeBookingB
        )
      ).toBe(false);
    });

    it(`GIVEN two bookings
        WHEN booking B has the start time equal to end time booking A
        THEN should return false`, () => {
      const startTimeBookingB = new Date(2024, 0, 20);
      const endTimeBookingB = new Date(2024, 0, 26);
      expect(
        isNotOverlapping(
          bookingStartTimeA,
          bookingEndTimeA,
          startTimeBookingB,
          endTimeBookingB
        )
      ).toBe(false);
    });

    it(`GIVEN two bookings
        WHEN booking B has the start time is between start time and end time of booking A
        THEN should return false`, () => {
      const startTimeBookingB = new Date(2024, 0, 19);
      const endTimeBookingB = new Date(2024, 0, 26);
      expect(
        isNotOverlapping(
          bookingStartTimeA,
          bookingEndTimeA,
          startTimeBookingB,
          endTimeBookingB
        )
      ).toBe(false);
    });

    it(`GIVEN two bookings
        WHEN booking B is in period of booking A
        THEN should return false`, () => {
      const startTimeBookingB = new Date(2024, 0, 15);
      const endTimeBookingB = new Date(2024, 0, 17);
      expect(
        isNotOverlapping(
          bookingStartTimeA,
          bookingEndTimeA,
          startTimeBookingB,
          endTimeBookingB
        )
      ).toBe(false);
    });

    it(`GIVEN two booking
        WHEN booking B is a valid booking
        THEN should return true`, () => {
      const startTimeBookingB = new Date(2024, 0, 21);
      const endTimeBookingB = new Date(2024, 0, 27);
      expect(
        isNotOverlapping(
          bookingStartTimeA,
          bookingEndTimeA,
          startTimeBookingB,
          endTimeBookingB
        )
      ).toBe(true);
    });
  });
});
