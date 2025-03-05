// CustomerVerification.test.jsx

// Mock the image import to prevent errors during testing
jest.mock('../assets/verification.avif', () => 'mocked-image-url');

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import OTPVerification from "./CustomerVerification";
import "@testing-library/jest-dom";

describe("OTPVerification Component", () => {
  test("renders OTP input fields correctly", () => {
    render(<OTPVerification />);

    // Check that there are 5 OTP input fields
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(5);
    
    // Check that each input field has the correct maxLength
    inputs.forEach((input) => {
      expect(input).toHaveAttribute("maxLength", "1");
    });
  });

  test("focuses next input field on input change", () => {
    render(<OTPVerification />);

    const inputs = screen.getAllByRole("textbox");

    // Simulate entering a value in the first input
    fireEvent.change(inputs[0], { target: { value: "1" } });

    // Check if the second input field is focused
    expect(inputs[1]).toHaveFocus();
  });

  test("only accepts one character per input field", () => {
    render(<OTPVerification />);

    const inputs = screen.getAllByRole("textbox");

    // Simulate pasting multiple digits into the first input
    fireEvent.change(inputs[0], { target: { value: "123" } });

    // Check if only the last character is accepted (should be "3")
    expect(inputs[0].value).toBe("3");
  });

  test("moves focus with ArrowRight and ArrowLeft", () => {
    render(<OTPVerification />);

    const inputs = screen.getAllByRole("textbox");

    // Focus on the first input
    inputs[0].focus();

    // Move focus to the next input using ArrowRight
    fireEvent.keyDown(inputs[0], { key: "ArrowRight" });
    expect(inputs[1]).toHaveFocus();

    // Move focus back to the previous input using ArrowLeft
    fireEvent.keyDown(inputs[1], { key: "ArrowLeft" });
    expect(inputs[0]).toHaveFocus();
  });

  test("moves focus to previous input on Backspace", () => {
    render(<OTPVerification />);

    const inputs = screen.getAllByRole("textbox");

    // Focus on the second input
    inputs[1].focus();

    // Simulate deleting the value in the second input (Backspace)
    fireEvent.keyDown(inputs[1], { key: "Backspace" });

    // Check if the focus moves to the first input
    expect(inputs[0]).toHaveFocus();
  });

  test("renders the 'Resend Code' link", () => {
    render(<OTPVerification />);

    // Check if the 'Resend Code' link is rendered
    const resendLink = screen.getByText(/Resend Code/i);
    expect(resendLink).toBeInTheDocument();
  });

  test("renders 'Verify & Proceed' button", () => {
    render(<OTPVerification />);

    // Check if the 'Verify & Proceed' button is rendered
    const verifyButton = screen.getByText(/Verify & Proceed/i);
    expect(verifyButton).toBeInTheDocument();
  });
});