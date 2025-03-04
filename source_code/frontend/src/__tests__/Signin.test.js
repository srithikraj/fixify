import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils"; // For wrapping async updates
import LoginPage from "../pages/signin"; // Adjust path to your file
import { AuthContext } from "../context/AuthContext";
import { verifyUser } from "../api/userApi";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock dependencies
jest.mock("../api/userApi", () => ({
  verifyUser: jest.fn(),
}));

const mockLogin = jest.fn();
const mockNavigate = jest.fn();

const authContextValue = {
  isAuthenticated: false,
  login: mockLogin,
};

const renderWithContext = (ui) => {
  return render(
    <BrowserRouter>
      <AuthContext.Provider value={authContextValue}>{ui}</AuthContext.Provider>
    </BrowserRouter>
  );
};

describe("LoginPage - User Input Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  test("renders username and password input fields", () => {
    renderWithContext(<LoginPage />);
    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();
  });

  test("username field is required and shows empty initially", () => {
    renderWithContext(<LoginPage />);
    const usernameInput = screen.getByPlaceholderText(/enter username/i);
    expect(usernameInput).toHaveAttribute("required");
    expect(usernameInput).toHaveValue("");
  });

  test("password field is required and shows empty initially", () => {
    renderWithContext(<LoginPage />);
    const passwordInput = screen.getByPlaceholderText(/enter password/i);
    expect(passwordInput).toHaveAttribute("required");
    expect(passwordInput).toHaveValue("");
  });

  test("username input updates on change", () => {
    renderWithContext(<LoginPage />);
    const usernameInput = screen.getByPlaceholderText(/enter username/i);
    fireEvent.change(usernameInput, { target: { value: "test@example.com" } });
    expect(usernameInput).toHaveValue("test@example.com");
  });

  test("password input updates on change", () => {
    renderWithContext(<LoginPage />);
    const passwordInput = screen.getByPlaceholderText(/enter password/i);
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput).toHaveValue("password123");
  });




  test("submit button is disabled during submission", async () => {
    verifyUser.mockImplementation(() => new Promise(() => {})); // Never resolves

    renderWithContext(<LoginPage />);
    const usernameInput = screen.getByPlaceholderText(/enter username/i);
    const passwordInput = screen.getByPlaceholderText(/enter password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });
});