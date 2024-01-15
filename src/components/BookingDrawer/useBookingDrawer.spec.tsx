import { act, renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useBookingDrawer } from "./useBookingDrawer";

const mockUseStore = jest.fn().mockImplementation(() => ({
  rooms: [],
  bookings: []
}));
jest.mock("@/lib/store", () => ({
  useStore: () => mockUseStore()
}));

let mockSearchParam = '';
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => {

    let params = new URLSearchParams(mockSearchParam)

    const setParams = (value: URLSearchParams) => {
      params = value
      mockSearchParam = value.toString();
    }

    return [
      params,
      setParams
    ];
  }
}));


describe('useBookingDrawer', () => {

  beforeEach(() => {
    mockSearchParam = "";
  })

  describe('openBookingModal', () => {
    it(`GIVEN the hook useBookingDrawer
        WHEN searchParams is empty
        THEN openBookingModal should be false`, () => {
      const { result } = renderHook(() => useBookingDrawer(), {
        wrapper: ({ children }) => (
          <MemoryRouter>
            {children}
          </MemoryRouter>
        )
      });

      expect(result.current.openBookingModal).toBe(false);
    })

    it(`GIVEN the hook useBookingDrawer
        WHEN searchParams has the 'openBookingModal'
        THEN openBookingModal should be true`, () => {
      mockSearchParam = "?openBookingModal=1"
      const { result } = renderHook(() => useBookingDrawer(), {
        wrapper: ({ children }) => (
          <MemoryRouter>
            {children}
          </MemoryRouter>
        )
      });

      expect(result.current.openBookingModal).toBe(true);
    })

    it(`GIVEN the hook useBookingDrawer
        WHEN searchParams has the 'openBookingEditModal'
        THEN openBookingModal should be true`, () => {
      mockSearchParam = "?openBookingEditModal=1"
      const { result } = renderHook(() => useBookingDrawer(), {
        wrapper: ({ children }) => (
          <MemoryRouter>
            {children}
          </MemoryRouter>
        )
      });

      expect(result.current.openBookingModal).toBe(true);
    })
  });

  describe('room', () => {
    it(`GIVEN a undefined openBookingModal key
        WHEN useBookingDrawer is called
        THEN should return room as undefined`, () => {
      const { result } = renderHook(() => useBookingDrawer(), {
        wrapper: ({ children }) => (
          <MemoryRouter>
            {children}
          </MemoryRouter>
        )
      });

      expect(result.current.room).toBeUndefined();
    });

    it(`GIVEN a defined openBookingModal key
        AND this id DOESNT exists
        WHEN useBookingDrawer is called
        THEN should return undefined room`, () => {
      mockSearchParam = "?openBookingEditModal=1"
      const { result } = renderHook(() => useBookingDrawer(), {
        wrapper: ({ children }) => (
          <MemoryRouter>
            {children}
          </MemoryRouter>
        )
      });

      expect(result.current.room).toBeUndefined();
    });

    it(`GIVEN a defined openBookingModal key
        AND this id exists
        WHEN useBookingDrawer is called
        THEN should return defined room`, () => {
      mockSearchParam = "?openBookingModal=room-id-1"
      mockUseStore.mockImplementationOnce(() => ({
        rooms: [
          {
            id: 'room-id-1',
            name: 'room name 1',
            description: 'room description 1',
            pricePerDay: 500,
            pricePerGuest: 40,
            photos: [],
          }
        ],
        bookings: []
      }));
      const { result } = renderHook(() => useBookingDrawer(), {
        wrapper: ({ children }) => (
          <MemoryRouter>
            {children}
          </MemoryRouter>
        )
      });

      expect(result.current.room).toBeDefined();
    });
  });

  describe('booking', () => {
    it(`GIVEN a undefined openBookingEditModal key
        WHEN useBookingDrawer is called
        THEN should return booking as undefined`, () => {
      const { result } = renderHook(() => useBookingDrawer(), {
        wrapper: ({ children }) => (
          <MemoryRouter>
            {children}
          </MemoryRouter>
        )
      });

      expect(result.current.booking).toBeUndefined();
    });

    it(`GIVEN a defined openBookingEditModal key
        AND this id DOESNT exists
        WHEN useBookingDrawer is called
        THEN should return undefined booking`, () => {
      mockSearchParam = "?openBookingEditModal=1"
      const { result } = renderHook(() => useBookingDrawer(), {
        wrapper: ({ children }) => (
          <MemoryRouter>
            {children}
          </MemoryRouter>
        )
      });

      expect(result.current.booking).toBeUndefined();
    });

    it(`GIVEN a defined openBookingEditModal key
        AND this id exists
        WHEN useBookingDrawer is called
        THEN should return defined booking`, () => {
      mockSearchParam = "?openBookingEditModal=booking-id-1"
      mockUseStore.mockImplementationOnce(() => ({
        bookings: [
          {
            id: 'booking-id-1',
            roomId: 'room-id-1',
            totalPrice: 8000,
            checkIn: new Date(2024, 0, 15),
            checkOut: new Date(2024, 0, 16),
            quantityGuests: 5,
          }
        ],
        rooms: []
      }));
      const { result } = renderHook(() => useBookingDrawer(), {
        wrapper: ({ children }) => (
          <MemoryRouter>
            {children}
          </MemoryRouter>
        )
      });

      expect(result.current.booking).toBeDefined();
    });

    it(`GIVEN a undefined openBookingEditModal key
        WHEN useBookingDrawer is called
        THEN should return room as undefined`, () => {
      const { result } = renderHook(() => useBookingDrawer(), {
        wrapper: ({ children }) => (
          <MemoryRouter>
            {children}
          </MemoryRouter>
        )
      });

      expect(result.current.room).toBeUndefined();
    })

    it(`GIVEN a defined openBookingEditModal key
        WHEN useBookingDrawer is called
        AND roomId is not a valid room
        THEN should return room as undefined`, () => {
      mockSearchParam = "?openBookingEditModal=booking-id-1"
      mockUseStore.mockImplementationOnce(() => ({
        bookings: [
          {
            id: 'booking-id-1',
            roomId: 'room-id-2',
            totalPrice: 8000,
            checkIn: new Date(2024, 0, 15),
            checkOut: new Date(2024, 0, 16),
            quantityGuests: 5,
          }
        ],
        rooms: [
          {
            id: 'room-id-1',
            name: 'room name 1',
            description: 'room description 1',
            pricePerDay: 500,
            pricePerGuest: 40,
            photos: [],
          }
        ]
      }));
      const { result } = renderHook(() => useBookingDrawer(), {
        wrapper: ({ children }) => (
          <MemoryRouter>
            {children}
          </MemoryRouter>
        )
      });

      expect(result.current.room).toBeUndefined();
    })

    it(`GIVEN a defined openBookingEditModal key
        WHEN useBookingDrawer is called
        AND roomId is a valid room
        THEN should return room as defined`, () => {
      mockSearchParam = "?openBookingEditModal=booking-id-1"
      mockUseStore.mockImplementationOnce(() => ({
        bookings: [
          {
            id: 'booking-id-1',
            roomId: 'room-id-1',
            totalPrice: 8000,
            checkIn: new Date(2024, 0, 15),
            checkOut: new Date(2024, 0, 16),
            quantityGuests: 5,
          }
        ],
        rooms: [
          {
            id: 'room-id-1',
            name: 'room name 1',
            description: 'room description 1',
            pricePerDay: 500,
            pricePerGuest: 40,
            photos: [],
          }
        ]
      }));
      const { result } = renderHook(() => useBookingDrawer(), {
        wrapper: ({ children }) => (
          <MemoryRouter>
            {children}
          </MemoryRouter >
        )
      });

      expect(result.current.room).toBeDefined();
    })
  });

  describe('onClose', () => {
    it(`GIVEN a searchParams with openBookingModal and openBookingEditModal keys
        WHEN call onClose function
        THEN should remove both keys`, () => {
      mockSearchParam = "?openBookingModal=1&openBookingEditModal=2"
      const { result } = renderHook(() => useBookingDrawer(), {
        wrapper: ({ children }) => (
          <MemoryRouter>
            {children}
          </MemoryRouter>
        )
      });

      expect(mockSearchParam).toContain('openBookingModal=1');
      expect(mockSearchParam).toContain('openBookingEditModal=2');
      act(() => result.current.onClose());
      expect(mockSearchParam).not.toContain('openBookingModal=1');
      expect(mockSearchParam).not.toContain('openBookingEditModal=2');
    })
  })

  describe('onEdit', () => {
    it(`GIVEN a searchParams without any key
        WHEN call onEdit
        THEN should add the openBookingEditModal to searchParams`, () => {
      const { result } = renderHook(() => useBookingDrawer(), {
        wrapper: ({ children }) => (
          <MemoryRouter>
            {children}
          </MemoryRouter>
        )
      });

      expect(mockSearchParam).not.toContain('openBookingEditModal');
      act(() => result.current.onEdit('1'));
      expect(mockSearchParam).toContain('openBookingEditModal=1');
    });
  })

  describe('onOpen', () => {
    it(`GIVEN a searchParams without any key
        WHEN call onOpen
        THEN should add the openBookingEditModal to searchParams`, () => {
      const { result } = renderHook(() => useBookingDrawer(), {
        wrapper: ({ children }) => (
          <MemoryRouter>
            {children}
          </MemoryRouter>
        )
      });

      expect(mockSearchParam).not.toContain('openBookingModal');
      act(() => result.current.onOpen('1'));
      expect(mockSearchParam).toContain('openBookingModal=1');
    });
  })
});