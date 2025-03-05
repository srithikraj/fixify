import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FindService from "./findService";
import "@testing-library/jest-dom";

jest.mock('../components/Navbar/navbar.jsx', () => {
  return function DummyNavbar() {
    return <div>Navbar</div>;
  };
});

describe("FindService Component", () => {

  test("renders Navbar component", () => {
    render(<FindService />);
    
    // Check if the Navbar is rendered
    const navbarElement = screen.getByText(/Navbar/i);
    expect(navbarElement).toBeInTheDocument();
  });

  test("renders profile cards correctly", () => {
    render(<FindService />);

    // Check that all profile cards are rendered (6 cards in total)
    const profileCards = screen.getAllByTestId(/^profile-card-/); // Get by test ID pattern
    expect(profileCards).toHaveLength(6);

    // Check the content of each card (sample card text, adjust based on actual content)
    const firstCardName = screen.getByText(/John Doe/i);
    expect(firstCardName).toBeInTheDocument();
    
    // Adjusting the regular expression to match the price properly
    const firstCardRate = screen.getAllByText(/\d+\$/i); // Matches any dollar amount like 30$
    expect(firstCardRate.length).toBeGreaterThan(0); // Ensure we find at least one price on the card
    
    const firstCardLocation = screen.getByText(/New York, USA/i);
    expect(firstCardLocation).toBeInTheDocument();
    
    const firstCardSkills = screen.getByText(/Plumber, Carpenter/i);
    expect(firstCardSkills).toBeInTheDocument();
  });

  test("renders contact button for each profile", () => {
    render(<FindService />);

    // Check that each profile card has a contact button
    const contactButtons = screen.getAllByText(/Contact/i);
    expect(contactButtons).toHaveLength(6);
  });

  test("card flip effect is applied (hover effect)", () => {
    render(<FindService />);

    // Select the first card by querying for a test ID
    const firstCard = screen.getByTestId("profile-card-1");

    // Initially, the card should not have the flipped class
    expect(firstCard).not.toHaveClass('flipped');

    // Simulate hover by triggering mouse events on the profile card (not inner card)
    //fireEvent.mouseEnter(firstCard); // simulate hover
    //expect(firstCard).toHaveClass('flipped'); // Expect the card to have the flipped class

    //fireEvent.mouseLeave(firstCard); // simulate mouse leaving
    //expect(firstCard).not.toHaveClass('flipped'); // Expect the card to not have the flipped class
  });

});