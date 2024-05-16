import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";

describe("UserAccount", () => {
  const user: User = {
    id: 1,
    name: "Divyam",
  };

  const admin: User = {
    id: 2,
    name: "Mark",
    isAdmin: true,
  };

  it("should render name of user", () => {
    render(<UserAccount user={user} />);
    expect(screen.getByText(user.name)).toBeInTheDocument();
  });

  it("should render edit button for admin", () => {
    render(<UserAccount user={admin} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });

  it("should not render edit button for normal user", () => {
    render(<UserAccount user={user} />);

    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });
});
