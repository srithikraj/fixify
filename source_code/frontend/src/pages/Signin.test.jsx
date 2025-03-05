import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "./signin"; // Ensure correct path

describe("LoginPage Component", () => {
  test("renders the sign-in page elements", () => {
    render(<LoginPage />);

    // Check for headings
    expect(screen.getByRole("heading", { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /welcome back!/i })).toBeInTheDocument();

    // Check for input fields
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Check for buttons
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  test("submits the form", () => {
    render(<LoginPage />);

    // Mock console.log
    global.console.log = jest.fn();

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "password123" } });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Check if console.log is called
    expect(console.log).toHaveBeenCalledWith("Login");
  });
});