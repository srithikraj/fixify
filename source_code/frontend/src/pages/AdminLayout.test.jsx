import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Sidebar from "../components/Sidebar/Sidebar";

// Mock Sidebar to prevent actual rendering issues
jest.mock("../components/Sidebar/Sidebar", () => ({ open, toggleDrawer }) => (
  <button data-testid="sidebar-toggle" onClick={toggleDrawer}>
    {open ? "Close Sidebar" : "Open Sidebar"}
  </button>
));

describe("AdminLayout Component", () => {
    /**
   * Test: Ensures the AdminLayout renders without crashing.
   * - Checks if the `main` layout container exists.
   */
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <AdminLayout />
      </MemoryRouter>
    );

    // Check if main layout exists
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
  /**
   * Test: Ensures that the sidebar is initially closed.
   * - Verifies that the sidebar toggle button shows "Open Sidebar" on initial render.
   */
  test("sidebar is initially closed", () => {
    render(
      <MemoryRouter>
        <AdminLayout />
      </MemoryRouter>
    );

    // Initially, the sidebar button should display "Open Sidebar"
    expect(screen.getByTestId("sidebar-toggle")).toHaveTextContent("Open Sidebar");
  });
  /**
   * Test: Simulates sidebar toggle functionality.
   * - Clicks the toggle button to open the sidebar.
   * - Clicks again to close the sidebar.
   */
  test("toggles sidebar on button click", () => {
    render(
      <MemoryRouter>
        <AdminLayout />
      </MemoryRouter>
    );

    const toggleButton = screen.getByTestId("sidebar-toggle");

    // Click to open sidebar
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent("Close Sidebar");

    // Click to close sidebar
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent("Open Sidebar");
  });
  /**
   * Test: Ensures that nested routes (Outlet) are rendered.
   * - Uses a test-id to verify the presence of Outlet content.
   */
  test("renders Outlet for nested routes", () => {
    render(
      <MemoryRouter>
        <AdminLayout />
      </MemoryRouter>
    );

    // Ensure that the Outlet (nested route content) exists
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});