import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/Explore Docker/i);
  expect(linkElement).toBeInTheDocument();
});
test("renders learn react link II", () => {
  render(<App />);
  const linkElement = screen.getByText(/Explore Docker/i);
  expect(linkElement).toBeInTheDocument();
});
