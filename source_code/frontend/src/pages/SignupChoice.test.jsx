import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import SignupChoice from "./SignupChoice";
import React from "react";
// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe("SignupChoice Component", () => {

  // Test if the component renders properly
  test("renders the page with title and cards", () => {
    render(
      <Router>
        <SignupChoice />
      </Router>
    );
    
    // Check if the title and instructions are rendered
    expect(screen.getByText(/Join Our Community/i)).toBeInTheDocument();
    expect(screen.getByText(/Choose how you'd like to be part of our platform/i)).toBeInTheDocument();
    
    // Check if the customer and worker cards are rendered
    expect(screen.getByText(/Customer/i)).toBeInTheDocument();
    expect(screen.getByText(/Worker/i)).toBeInTheDocument();
  });

  // Test if the continue button is disabled initially
  test("continue button is disabled initially", () => {
    render(
      <Router>
        <SignupChoice />
      </Router>
    );
    
    const continueButton = screen.getByRole("button", { name: /continue/i });
    expect(continueButton).toBeDisabled();
  });

  // Test if selecting the customer card enables the continue button
  test("selecting customer enables continue button", () => {
    render(
      <Router>
        <SignupChoice />
      </Router>
    );
    
    // Click on the customer card
    fireEvent.click(screen.getByText(/Customer/i));
    
    // Check if the continue button is enabled
    const continueButton = screen.getByRole("button", { name: /continue/i });
    expect(continueButton).not.toBeDisabled();
  });

  // Test if selecting the worker card enables the continue button
  test("selecting worker enables continue button", () => {
    render(
      <Router>
        <SignupChoice />
      </Router>
    );
    
    // Click on the worker card
    fireEvent.click(screen.getByText(/Worker/i));
    
    // Check if the continue button is enabled
    const continueButton = screen.getByRole("button", { name: /continue/i });
    expect(continueButton).not.toBeDisabled();
  });

  // Test if the navigate function works when the continue button is clicked
  test("navigate to correct page when continue button is clicked", async () => {
    const mockNavigate = jest.fn(); // Create a mock function for navigation

    // Mock useNavigate to use our mock function
    useNavigate.mockImplementation(mockNavigate);

    render(
      <Router>
        <SignupChoice />
      </Router>
    );

    // Select customer and click continue
    fireEvent.click(screen.getByText(/Customer/i)); // Select the customer option
    
    // Wait for the button to be enabled and then click it
    const continueButton = screen.getByRole("button", { name: /continue/i });
    await waitFor(() => expect(continueButton).not.toBeDisabled());
    fireEvent.click(continueButton); // Click continue
    
    // Check if the navigate function was called with the correct URL
    expect(mockNavigate).toHaveBeenCalledWith("/create-account");

    // Reset mockNavigate before the second test
    mockNavigate.mockReset();

    // Select worker and click continue
    fireEvent.click(screen.getByText(/Worker/i)); // Select the worker option
    
    // Wait for the button to be enabled and then click it
    await waitFor(() => expect(continueButton).not.toBeDisabled());
    fireEvent.click(continueButton); // Click continue
    
    // Check if the navigate function was called with the correct URL
    expect(mockNavigate).toHaveBeenCalledWith("/service-provider");
  });
});