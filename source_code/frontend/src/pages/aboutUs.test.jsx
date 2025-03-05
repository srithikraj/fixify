import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutUs from './aboutUs';  // Adjust the import path if necessary

// Test Suite for AboutUs component
describe('AboutUs Component', () => {
  test('renders About Us section', () => {
    render(<AboutUs />);

    /** 
   *  Test: Renders "ABOUT US" section with correct text.
   * - Checks for the presence of the title.
   * - Verifies that the introductory text is visible.
   */
    const aboutUsTitle = screen.getByText(/ABOUT US/i);
    expect(aboutUsTitle).toBeInTheDocument();

    // Check if the paragraph text is displayed
    const aboutText = screen.getByText(/Welcome to FIXIFY!/i);
    expect(aboutText).toBeInTheDocument();
  });

  /**
   * Test: Renders the "OUR TEAM" section correctly.
   * - Ensures the title "MEET OUR TEAM" is present.
   * - Verifies that all team member images are rendered.
   */

  test('renders team section', () => {
    render(<AboutUs />);

    // Check if the "MEET OUR TEAM" section is rendered
    const teamTitle = screen.getByText(/MEET OUR TEAM/i);
    expect(teamTitle).toBeInTheDocument();

    // Check if team member images are rendered
    const teamMembers = screen.getAllByAltText(/Arshita|Geetika|Bhargav|Raghul|Rajveer|Rithik/i);
    expect(teamMembers).toHaveLength(6);  // Assuming 6 team members
  });
});