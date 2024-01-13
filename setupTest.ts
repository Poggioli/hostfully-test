import { vi } from "vitest";
import { QueryClient, QueryClientProvider } from "react-query";

vi.mock('axios', () => {
  return {
    default: {
      post: vi.fn(),
      get: vi.fn(),
      delete: vi.fn(),
      put: vi.fn(),
      create: vi.fn().mockReturnThis(),
      interceptors: {
        request: {
          use: vi.fn(),
          eject: vi.fn(),
        },
        response: {
          use: vi.fn(),
          eject: vi.fn(),
        },
      },
    },
  };
});

export const queryClientMock = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
})
