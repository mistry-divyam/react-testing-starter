import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ExpandableText from "../../src/components/ExpandableText";

describe("ExpandableText", () => {
  const limit: number = 255;
  const shortText: string = "Hello world";
  const longText: string = "abcd".repeat(100);
  const truncatedText: string = longText.substring(0, limit) + "...";

  it("should render short text as is without any buttons", () => {
    render(<ExpandableText text={shortText} />);

    expect(screen.getByText(shortText)).toBeInTheDocument();

    const button = screen.queryAllByRole("button", {
      name: /show more/i || /show less/i,
    });
    expect(button.length).toBe(0);
  });

  it("should render clipped text with show more button", () => {
    render(<ExpandableText text={longText} />);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    const button = screen.queryByRole("button");
    expect(button).toHaveTextContent(/more/i);
  });

  it("should expand text when show more button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);
  });

  it("should collapse text when show less button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    const showMoreButton = screen.getByRole("button", { name: /more/i });
    const user = userEvent.setup();
    await user.click(showMoreButton);

    const showLessButton = screen.getByRole("button", { name: /less/i });
    await user.click(showLessButton);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(showMoreButton).toHaveTextContent(/more/i);
  });
});
