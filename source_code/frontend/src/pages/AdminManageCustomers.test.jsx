import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ManageCustomers from "./AdminManageCustomers";
import CustomerUpdateModal from "../components/customerModal/CustomerUpdateModal";
import "@testing-library/jest-dom";

// Mock the CustomerUpdateModal to avoid unnecessary modal complexity in the tests
jest.mock("../components/customerModal/CustomerUpdateModal", () => {
  return jest.fn(() => <div>Mocked CustomerUpdateModal</div>);
});

describe("AdminManageCustomers Component", () => {
   /**
   * Test: Ensures customer list and headers are rendered correctly.
   */
  test("renders customer list correctly", () => {
    render(<ManageCustomers />);

    // Check that the table headers are rendered correctly
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();

    // Check that the customer names are rendered correctly
    const customerNames = [
      "Emma Wilson", "Liam Anderson", "Olivia Taylor", 
      "Noah Martinez", "Ava Johnson"
    ];
    customerNames.forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });
 /**
   * Test: Ensures that clicking "View" button opens the modal.
   */
  test("opens modal when 'View' button is clicked", async () => {
    render(<ManageCustomers />);

    const viewButtons = screen.getAllByText("View");
    fireEvent.click(viewButtons[0]); // Click the first "View" button

    // Check if the modal is opened and the customer info is passed
    await waitFor(() => {
      expect(CustomerUpdateModal).toHaveBeenCalledWith(
        expect.objectContaining({
          open: true,
          handleClose: expect.any(Function),
          customer: expect.objectContaining({ name: "Emma Wilson" })
        }),
        {}
      );
    });
  });
 /**
   * Test: Simulates closing the modal.
   */
  test("closes modal after opening", async () => {
    render(<ManageCustomers />);

    const viewButton = screen.getByText("View");
    fireEvent.click(viewButton); // Open the modal

    // Check if modal is opened
    expect(CustomerUpdateModal).toHaveBeenCalledWith(
      expect.objectContaining({ open: true }),
      {}
    );

    // Close the modal (simulate close action)
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    // Check if modal is closed
    await waitFor(() => {
      expect(CustomerUpdateModal).toHaveBeenCalledWith(
        expect.objectContaining({ open: false }),
        {}
      );
    });
  });

    /**
   *  Test: Simulates search input functionality.
   */

  test("handles search input change", () => {
    render(<ManageCustomers />);

    const searchInput = screen.getByLabelText("Search customers...");
    fireEvent.change(searchInput, { target: { value: "Emma" } });

    // Assert that the value has been updated
    expect(searchInput.value).toBe("Emma");
  });
  /**
   * Test: Ensures search input and customer list render without errors.
   */
  test("renders search input and customer list without errors", () => {
    render(<ManageCustomers />);

    // Check the presence of search input field
    expect(screen.getByLabelText("Search customers...")).toBeInTheDocument();

    // Check the customer names
    expect(screen.getByText("Emma Wilson")).toBeInTheDocument();
  });
});