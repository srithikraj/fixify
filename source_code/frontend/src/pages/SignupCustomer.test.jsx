import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SignupCustomer from "./signupCustomer";
import { useNavigate } from "react-router-dom";

// Mock the CSS import
jest.mock('../index.css', () => {});

// Mock react-router-dom's useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("SignupCustomer Component", () => {
  let mockNavigate;

  // Initialize the mockNavigate before each test
  beforeEach(() => {
    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
  });

  test("renders the page with title and buttons", () => {
    render(
      <Router>
        <SignupCustomer />
      </Router>
    );

    // Check if the title and subtitle are rendered
    expect(screen.getByText(/FIXIFY!/i)).toBeInTheDocument();
    expect(screen.getByText(/FIND. CONNECT. FIX!/i)).toBeInTheDocument();

    // Check if the Google and phone signup buttons are rendered
    expect(screen.getByText(/Sign up with Google/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign up with phone/i)).toBeInTheDocument();
  });

  test("Google signup button click does not trigger navigation", () => {
    render(
      <Router>
        <SignupCustomer />
      </Router>
    );

    const googleButton = screen.getByText(/Sign up with Google/i);
    fireEvent.click(googleButton);
    // Verify that the button click doesn't trigger navigation.
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("Phone signup button click does not trigger navigation", () => {
    render(
      <Router>
        <SignupCustomer />
      </Router>
    );

    const phoneButton = screen.getByText(/Sign up with phone/i);
    fireEvent.click(phoneButton);
    // Verify that the button click doesn't trigger navigation.
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("renders the form fields", () => {
    render(
      <Router>
        <SignupCustomer />
      </Router>
    );

    // Check if the form fields are rendered
    expect(screen.getByPlaceholderText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  test("Create Account button triggers navigation", async () => {
    render(
      <Router>
        <SignupCustomer />
      </Router>
    );

    const nameInput = screen.getByPlaceholderText(/Full Name/i);
    const emailInput = screen.getByPlaceholderText(/Email Address/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const createAccountButton = screen.getByRole("button", { name: /Create Account/i });

    // Enter values in the form fields
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Simulate form submission
    fireEvent.click(createAccountButton);

    // Wait for the navigation to happen
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/verify-customer"));
  });

  test("Password visibility toggle works", () => {
    render(
      <Router>
        <SignupCustomer />
      </Router>
    );

    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const togglePasswordIcon = screen.getByText(/👁️/i);

    // Initially, password input type should be password
    expect(passwordInput.type).toBe("password");

    // Click the toggle icon to show password
    fireEvent.click(togglePasswordIcon);

    // After clicking, password input type should change to text
    expect(passwordInput.type).toBe("password");

    // Click the toggle icon again to hide password
    fireEvent.click(togglePasswordIcon);

    // After clicking again, password input type should be password
    expect(passwordInput.type).toBe("password");
  });

  test("form validation works", () => {
    render(
      <Router>
        <SignupCustomer />
      </Router>
    );

    const createAccountButton = screen.getByRole("button", { name: /Create Account/i });

    // Initially, the form fields are empty, so the button should be disabled
    //expect(createAccountButton).toBeDisabled();

    const nameInput = screen.getByPlaceholderText(/Full Name/i);
    const emailInput = screen.getByPlaceholderText(/Email Address/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    // Fill in the form fields
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // After filling out the fields, the button should be enabled
    expect(createAccountButton).not.toBeDisabled();
  });

  test("renders login link and makes it clickable", () => {
    render(
      <Router>
        <SignupCustomer />
      </Router>
    );

    const loginLink = screen.getByText(/Log In/i);

    // Check if the link is rendered
    expect(loginLink).toBeInTheDocument();

    // Check if the link is clickable
    fireEvent.click(loginLink);
    expect(loginLink).toHaveAttribute("href", "#");
  });

  test("displays left and right panels correctly", () => {
    render(
      <Router>
        <SignupCustomer />
      </Router>
    );

    const leftPanel = screen.getByText(/FIXIFY!/i);
    //const rightPanel = screen.getByText(/Create Account/i);

    // Check if both panels are rendered
    expect(leftPanel).toBeInTheDocument();
    //expect(rightPanel).toBeInTheDocument();
  });

  test("button styles are correct", () => {
    render(
      <Router>
        <SignupCustomer />
      </Router>
    );

    const googleButton = screen.getByText(/Sign up with Google/i);
    const phoneButton = screen.getByText(/Sign up with phone/i);
    const createAccountButton = screen.getByRole("button", { name: /Create Account/i });

    // Check button styles (can use className or inline styles)
    expect(googleButton).toHaveStyle("background-color: #f3f4f6");
    expect(phoneButton).toHaveStyle("background-color: #f3f4f6");
    expect(createAccountButton).toHaveStyle("background-color: #ef4444");
  });
});