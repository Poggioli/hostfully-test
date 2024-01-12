const ONE_DAY_IN_MILLI = 86400000 as const;

export function isEndTimeGreatherThanStartTime(startTime: Date, endTime: Date): boolean {
  return endTime.getTime() > startTime.getTime();
}

export function isBookingAtLeastForOneDay(startTime: Date, endTime: Date): boolean {
    return endTime.getTime() - startTime.getTime() >= ONE_DAY_IN_MILLI;
}

export function isNotOverlapping(startTimeA: Date, endTimeA: Date, startTimeToBeBooked: Date, endTimeToBeBooked: Date): boolean {
  return (startTimeA.getTime() > startTimeToBeBooked.getTime() && startTimeA.getTime() > endTimeToBeBooked.getTime()) ||
      (startTimeToBeBooked.getTime() > endTimeA.getTime() && endTimeToBeBooked.getTime() > endTimeA.getTime())
}