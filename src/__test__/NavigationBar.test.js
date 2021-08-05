import { render, screen } from "@testing-library/react";
import NavigationBar from "../components/NavigationBar";

test("Should load navbar", () => {
  const component = render(<NavigationBar />);

  expect(screen.getByText("Issues")).toBeInTheDocument();
  component.unmount();
});
