import { render } from "@testing-library/react";
import { CheckoutInfo } from "./CheckoutInfo";

describe('CheckoutInfo', () => {
  it(`GIVEN a CheckoutInfo
      WHEN render
      THEN should render the props the right way`, () => {
    const { baseElement } = render(
      <CheckoutInfo
        bookingDays={5}
        pricePerDay={500}
        pricePerGuest={100}
        quantityGuests={3}
        totalPrice={2800}
        totalPriceDay={2500}
        totalPriceGuest={300}
      />
    )

    expect(baseElement).toMatchSnapshot();
  });
});