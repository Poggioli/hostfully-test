import { renderHook } from "@testing-library/react";
import { MockedFunction, describe, expect, it, vi } from "vitest";
import { useBookingDrawer } from ".";
import { MemoryRouter } from "react-router-dom";
import { useStore } from "@/lib/store";

vi.mock("@/lib/store")

describe('useBookingDrawer', () => {

  const render = (initialEntries?: string[]) => {
    const wrapper = ({ children }: { children: any }) => <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    return renderHook(useBookingDrawer, { wrapper })
  }

  (useStore as unknown as MockedFunction<typeof useStore>).mockImplementation(() => ({
    rooms: [
      {
        id: "1",
        name: "Name 1",
        description: "Description 1",
        pricePerDay: 100,
        photos: []
      },
      {
        id: "2",
        name: "Name 2",
        description: "Description 2",
        pricePerDay: 100,
        photos: []
      },
    ]
  }))

  describe('openBookingModal', () => {
    it(`GIVEN a searchParams
        WHEN doesnt have the 'openBookingModal' key
        THEN openBookingModal should be false`, () => {
      const { result } = render()
      expect(result.current.openBookingModal).toEqual(false)
      expect(result.current.room).toEqual(undefined)
    })

    it(`GIVEN a searchParams
        WHEN have the 'openBookingModal' key
        THEN openBookingModal should be true`, () => {
      const { result } = render(['?openBookingModal=1'])
      expect(result.current.openBookingModal).toEqual(true)
      expect(result.current.room).toBeDefined()
    })
  })

  describe('onClose', () => {
    it(`GIVEN a searchParams
        AND have the 'openBookingModal' key
        WHEN call onClose
        THEN should remove the searchParams
        AND openBookingModal should be false`, () => {
      const { result, rerender } = render(['?openBookingModal=1'])
      expect(result.current.openBookingModal).toEqual(true)
      expect(result.current.room).toBeDefined()
      result.current.onClose();
      rerender();
      expect(result.current.openBookingModal).toEqual(false)
      expect(result.current.room).toEqual(undefined)
    })
  })

  describe('onOpen', () => {
    it(`GIVEN a searchParams
        AND doesnt have the 'openBookingModal' key
        WHEN call onOpen
        THEN should add 'openBookingModal' to the searchParams
        AND openBookingModal should be true`, () => {
      const { result, rerender } = render()
      expect(result.current.openBookingModal).toEqual(false)
      expect(result.current.room).toEqual(undefined)
      result.current.onOpen('1');
      rerender();
      expect(result.current.openBookingModal).toEqual(true)
      expect(result.current.room).toBeDefined()
    });
  })
})