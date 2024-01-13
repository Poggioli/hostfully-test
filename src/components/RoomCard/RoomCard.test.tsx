import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { RoomCard } from './RoomCard'
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { queryClientMock } from '../../../setupTest';

describe('RoomCard', () => {
  it(`GIVEN a RoomCard
      WHEN render
      THEN should match with snapshot`, () => {
    const room = {
      id: "82c67959-a414-4470-b26b-ba4261cfe867",
      name: "House with Wi-Fi",
      description: "Is located just 1 hour from the center of SP, easy access via Regis Bitencourt, an all paved route",
      pricePerDay: 900,
      photos: [
        "https://images.unsplash.com/photo-1704211825599-9e2ec712f561",
        "https://images.unsplash.com/photo-1696861080288-0cc2f1cd48d5"
      ]
    }
    const { baseElement } = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClientMock}>
          <RoomCard {...room} />
        </QueryClientProvider>
      </BrowserRouter>
    )
    expect(baseElement).toMatchSnapshot()
  });
})