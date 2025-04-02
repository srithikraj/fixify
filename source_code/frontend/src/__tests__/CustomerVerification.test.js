// OTPVerification.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OTPVerification from "../pages/CustomerVerification";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

// Mock axios
jest.mock("axios");

// Set up react-router mocks
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    state: { userId: "123", email: "test@example.com" },
  }),
  useNavigate: () => mockNavigate,
}));

describe("OTPVerification Component", () => {
  // Use fake timers to control the setTimeout in handleSubmit
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("renders the OTP verification page with expected text", () => {
    render(<OTPVerification />, { wrapper: BrowserRouter });
    expect(screen.getByText(/OTP Verification/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Enter OTP Code sent to test@example.com/i)
    ).toBeInTheDocument();
  });

  test("shows error if OTP is incomplete on submit", async () => {
    render(<OTPVerification />, { wrapper: BrowserRouter });
    const submitButton = screen.getByRole("button", {
      name: /Verify & Proceed/i,
    });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(
        screen.getByText(/Please enter a 5-digit OTP/i)
      ).toBeInTheDocument();
    });
  });

  test("successfully verifies OTP and navigates to sign-in", async () => {
    // Simulate a successful OTP verification response
    axios.post.mockResolvedValueOnce({ data: { success: true } });
    render(<OTPVerification />, { wrapper: BrowserRouter });

    // Fill in OTP inputs with digits "1", "2", "3", "4", "5"
    const otpInputs = screen.getAllByRole("textbox");
    fireEvent.change(otpInputs[0], { target: { value: "1" } });
    fireEvent.change(otpInputs[1], { target: { value: "2" } });
    fireEvent.change(otpInputs[2], { target: { value: "3" } });
    fireEvent.change(otpInputs[3], { target: { value: "4" } });
    fireEvent.change(otpInputs[4], { target: { value: "5" } });

    const submitButton = screen.getByRole("button", {
      name: /Verify & Proceed/i,
    });
    fireEvent.click(submitButton);

    // Verify axios.post is called with the proper endpoint and payload
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3000/verify-otp",
        { userId: "123", otp: "12345" }
      );
    });

    // Verify that the success message is displayed
    await waitFor(() => {
      expect(
        screen.getByText(/OTP verified successfully! Redirecting to sign-in.../i)
      ).toBeInTheDocument();
    });

    // Fast-forward the timeout delay (2 seconds) for navigation
    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/signin", {
        state: { message: "Email verified successfully! Please log in." },
      });
    });
  });

  test("displays error message on failed verification", async () => {
    // Simulate a failed OTP verification response
    axios.post.mockResolvedValueOnce({
      data: { success: false, message: "Invalid OTP" },
    });
    render(<OTPVerification />, { wrapper: BrowserRouter });

    // Fill in OTP inputs with digits "1", "2", "3", "4", "5"
    const otpInputs = screen.getAllByRole("textbox");
    fireEvent.change(otpInputs[0], { target: { value: "1" } });
    fireEvent.change(otpInputs[1], { target: { value: "2" } });
    fireEvent.change(otpInputs[2], { target: { value: "3" } });
    fireEvent.change(otpInputs[3], { target: { value: "4" } });
    fireEvent.change(otpInputs[4], { target: { value: "5" } });

    const submitButton = screen.getByRole("button", {
      name: /Verify & Proceed/i,
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:3000/verify-otp",
        { userId: "123", otp: "12345" }
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/Invalid OTP/i)).toBeInTheDocument();
    });
  });

  test("handles resend OTP successfully", async () => {
    axios.post.mockResolvedValueOnce({ data: { success: true } });
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<OTPVerification />, { wrapper: BrowserRouter });
    const resendButton = screen.getByRole("button", {
      name: /Resend Code/i,
    });
    fireEvent.click(resendButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/send-otp", {
        email: "test@example.com",
      });
    });

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("OTP resent successfully!");
    });
  });
});