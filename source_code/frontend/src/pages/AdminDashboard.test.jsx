import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

// Mock recharts to avoid issues with JSDOM (jest dont support svg elements properly)
jest.mock("recharts", () => ({
  ResponsiveContainer: ({ children }) => <div data-testid="mocked-chart">{children}</div>,
  BarChart: ({ children }) => <div>{children}</div>,
  XAxis: () => <div />,
  YAxis: () => <div />,
  Tooltip: () => <div />,
  Bar: () => <div />,
}));

describe('AdminDashboard Component', () => {
  /** 
   * Test: Renders Admin Dashboard title and description.
   * - Ensures that the main heading and description are displayed correctly.
   */
  test('renders Admin Dashboard title and description', () => {
    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    // Check if the title is present
    const dashboardTitle = screen.getByText(/Welcome to Admin Dashboard/i);
    expect(dashboardTitle).toBeInTheDocument();

    // Check if the description is present
    const dashboardDescription = screen.getByText(/Overview of customers, workers, and performance analytics/i);
    expect(dashboardDescription).toBeInTheDocument();
  });
  
  /**
   * Test: Renders statistics cards with correct data.
   * - Verifies that key statistics such as total customers, workers, reviews, and growth rate are displayed.
   */
  test('renders stats cards with correct content', () => {
    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );
    
    // Verify if statistics cards contain the correct labels and values
    expect(screen.getByText(/Total Customers/i)).toBeInTheDocument();
    expect(screen.getByText(/120/i)).toBeInTheDocument();

    expect(screen.getByText(/Total Workers/i)).toBeInTheDocument();
    expect(screen.getByText(/50/i)).toBeInTheDocument();

    expect(screen.getByText(/Total Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/690/i)).toBeInTheDocument();

    expect(screen.getByText(/Growth Rate/i)).toBeInTheDocument();
    expect(screen.getByText(/78%/i)).toBeInTheDocument();
  });

  /**
   * Test: Renders website analytics chart.
   * - Ensures that the analytics section is visible.
   * - Confirms that the mocked chart component is correctly rendered.
   */
  test('renders website analytics chart', async () => {
    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    // Check if the "Website Analytics" title is present
    expect(screen.getByText(/Website Analytics/i)).toBeInTheDocument();

    // Check if the mocked chart container is in the document
    expect(await screen.findByTestId("mocked-chart")).toBeInTheDocument();
  });
  /**
   * Test: Renders recent activity section.
   * - Checks if recent activity updates are displayed correctly.
   */
  test('renders recent activity section', () => {
    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    // Verify that the section title is present
    expect(screen.getByText(/Recent Activity/i)).toBeInTheDocument();
      
    // Check if the recent activity logs are shown
    expect(screen.getByText(/5 new customers signed up/i)).toBeInTheDocument();
    expect(screen.getByText(/3 new workers registered/i)).toBeInTheDocument();
    expect(screen.getByText(/1 worker deactivated/i)).toBeInTheDocument();
  });

});