import React from "react"; 
import { render, screen, fireEvent } from "@testing-library/react";
import ManageWorkers from "./AdminManageWorkers"; 
import "@testing-library/jest-dom";

// Mock the modal component
jest.mock("../components/serviceProviderModal/ServiceProviderUpdateModal", () => ({
  __esModule: true,
  default: ({ open, handleClose }) => {
    // Simulate the modal by rendering its content based on 'open' prop
    return open ? (
      <div role="dialog">
        <h1>Mocked Modal</h1>
        <button onClick={handleClose}>Close Modal</button>
      </div>
    ) : null;
  }
}));

describe("ManageWorkers Component", () => {
  /**
   * Mock data representing workers in the system.
   * Each worker has a name, email, service type, and rating.
   */
  const mockWorkers = [
    { name: "John Doe", email: "john@example.com", service: "Plumbing", rating: 4.5 },
    { name: "Jane Smith", email: "jane@example.com", service: "Electrical", rating: 4.8 },
    { name: "Bob Johnson", email: "bob@example.com", service: "Carpentry", rating: 4.2 },
    { name: "Alice Brown", email: "alice@example.com", service: "Painting", rating: 4.6 },
    { name: "Charlie Davis", email: "charlie@example.com", service: "Gardening", rating: 4.7 }
  ];

  // Test if page elements render correctly
  test("renders the manage workers page elements", () => {
    render(<ManageWorkers workers={mockWorkers} />); // Pass the mock data directly

    // Check for heading
    expect(screen.getByRole("heading", { name: /manage workers/i })).toBeInTheDocument();

    // Check for search input field
    expect(screen.getByLabelText(/search workers/i)).toBeInTheDocument();

    // Check for table headers
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/service/i)).toBeInTheDocument();
    expect(screen.getByText(/rating/i)).toBeInTheDocument();
    expect(screen.getByText(/actions/i)).toBeInTheDocument();
  });

  // Test if worker details are displayed correctly
  test("displays worker details correctly", () => {
    render(<ManageWorkers workers={mockWorkers} />); // Pass the mock data directly

    // Check if worker names are rendered
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/jane smith/i)).toBeInTheDocument();
    expect(screen.getByText(/bob johnson/i)).toBeInTheDocument();

    // Check if corresponding services are displayed
    expect(screen.getByText(/plumbing/i)).toBeInTheDocument();
    expect(screen.getByText(/electrical/i)).toBeInTheDocument();
    expect(screen.getByText(/carpentry/i)).toBeInTheDocument();
  });

  // Test if clicking 'View' button opens the mocked modal
  test("clicking 'View' button opens modal", () => {
    render(<ManageWorkers workers={mockWorkers} />); // Pass the mock data directly

    const viewButton = screen.getAllByRole("button", { name: /view/i })[0];
    fireEvent.click(viewButton);

    // The modal component should be rendered (mock modal behavior in real tests)
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Mocked Modal")).toBeInTheDocument();
  });

  // Test if clicking 'Close Modal' button works
  test("clicking 'Close Modal' button closes modal", () => {
    render(<ManageWorkers workers={mockWorkers} />); // Pass the mock data directly

    const viewButton = screen.getAllByRole("button", { name: /view/i })[0];
    fireEvent.click(viewButton);

    // Check if modal is rendered
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    
    // Simulate closing the modal
    const closeButton = screen.getByText("Close Modal");
    fireEvent.click(closeButton);

    // Check if modal is closed
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});