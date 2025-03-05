import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WorkerManagementForm from "./serviceProviderLogin";  // Update the import path if needed
import "@testing-library/jest-dom";

// Mock the console.log function to check form submission
global.console.log = jest.fn();

describe("WorkerManagementForm Component", () => {

  beforeEach(() => {
    // Clear all mock calls before each test
    jest.clearAllMocks();
  });

  test("renders form fields correctly", () => {
    render(<WorkerManagementForm />);

    // Check if the necessary fields are present
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Skill/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Hourly Rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Profile Picture/i)).toBeInTheDocument();
  });

  test("can type in input fields", () => {
    render(<WorkerManagementForm />);

    // Check if user can type in the input fields
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "john.doe@example.com" } });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: "1234567890" } });
    fireEvent.change(screen.getByLabelText(/Skill/i), { target: { value: "Plumber" } });
    fireEvent.change(screen.getByLabelText(/Hourly Rate/i), { target: { value: "30" } });

    // Check if the fields were updated
    expect(screen.getByLabelText(/Name/i).value).toBe("John Doe");
    expect(screen.getByLabelText(/Email/i).value).toBe("john.doe@example.com");
    expect(screen.getByLabelText(/Phone/i).value).toBe("1234567890");
    expect(screen.getByLabelText(/Skill/i).value).toBe("Plumber");
    expect(screen.getByLabelText(/Hourly Rate/i).value).toBe("30");
  });

  test("submit button triggers handleSubmit", async () => {
    render(<WorkerManagementForm />);

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "john.doe@example.com" } });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: "1234567890" } });
    fireEvent.change(screen.getByLabelText(/Skill/i), { target: { value: "Plumber" } });
    fireEvent.change(screen.getByLabelText(/Hourly Rate/i), { target: { value: "30" } });

    // Click the submit button
    fireEvent.click(screen.getByText(/Submit/i));

    // Check if console.log has been called with the worker details
    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "1234567890",
          skill: "Plumber",
          hourlyRate: "30",
        })
      );
    });
  });

  test("can upload a profile picture", () => {
    render(<WorkerManagementForm />);
  
    // Create a mock file to simulate file input
    const file = new File(["dummy content"], "profile.jpg", { type: "image/jpeg" });
  
    // Query the file input element using its role as 'input'
    const fileInput = screen.getByRole("input", { name: /Profile Picture/i });
  
    // Fire the change event to upload the file
    fireEvent.change(fileInput, { target: { files: [file] } });
  
    // Check if the file name appears in the UI
    expect(screen.getByText(/Selected: profile.jpg/i)).toBeInTheDocument();
  });
});