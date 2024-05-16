import { render, screen } from "@testing-library/react";
import Greet from "../../src/components/Greet";

describe("Greet", () => {
  it("should render hello + name when passed", () => {
    // render the component
    render(<Greet name="Divyam" />);

    const heading = screen.getByRole("heading");

    // write assertions here
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/divyam/i);
  });

  it("should render login button when name is not passed", () => {
    render(<Greet />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i);
  });
});
