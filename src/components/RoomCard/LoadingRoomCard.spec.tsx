import { render } from "@testing-library/react";
import { LoadingRoomCard } from "./LoadingRoomCard";

describe('LoadingRoomCard', () => {
  it(`GIVEN a LoadingRoomCard
      WHEN render
      THEN should render all props the right way`, () => {
    const { baseElement } = render(<LoadingRoomCard />);
    expect(baseElement).toMatchSnapshot();
  });
})