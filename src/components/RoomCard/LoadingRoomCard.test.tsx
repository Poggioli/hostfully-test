import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LoadingRoomCard } from './LoadingRoomCard'

describe('LoadingRoomCard', () => {
  it(`GIVEN a LoadingRoomCard
      WHEN render
      THEN should match with snapshot`, () => {
    const { baseElement } = render(<LoadingRoomCard />)
    expect(baseElement).toMatchSnapshot()
  })
})