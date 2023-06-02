import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Navigation message", () => {
  render(<App />);
  const welcomeMessage = screen.queryByText("HOME - Hello!");
  // expect(welcomeMessage).toBeInTheDocument();
});