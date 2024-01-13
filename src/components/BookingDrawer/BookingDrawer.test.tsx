import { useStore } from "@/lib/store";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { BookingDrawer } from "./BookingDrawer";

describe('BookingDrawer', () => {

  const renderComponent = (initialEntries?: string[]) => {
    const wrapper = ({ children }: { children: any }) => <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    return render(<BookingDrawer />, { wrapper })
  }

  const mockStore = vi.fn().mockImplementation(useStore);

  mockStore.mockImplementation(() => ({
    rooms: [
      {
        id: "1",
        name: "Name 1",
        description: "Description 1",
        pricePerDay: 100,
        photos: []
      }
    ]
  }))

  it(`GIVEN a room
      WHEN room doesnt exists
      THEN should show the Not found message`, () => {
    const { baseElement } = renderComponent(['?openBookingModal=2']);
    expect(baseElement).toMatchSnapshot()
  })
})