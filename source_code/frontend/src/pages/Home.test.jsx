import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './home'; // Adjust the path based on your project structure
import '@testing-library/jest-dom';

// Mocking child components so that we only test the Home component's structure
jest.mock('../components/Footer/footer', () => () => <div>Footer</div>);
jest.mock('../components/Hero/hero', () => () => <div>Hero</div>);
jest.mock('../components/howitworks/howworks', () => () => <div>HowItWorks</div>);
jest.mock('../components/Navbar/Navbar', () => () => <div>Navbar</div>);
jest.mock('../components/getstarted/getstarted', () => () => <div>ReadyToGetStarted</div>);
jest.mock('../components/serviceSection/serviceSection', () => () => <div>ServicesSection</div>);

describe("Home Component", () => {
  test("renders Navbar component", () => {
    render(<Home />);
    expect(screen.getByText(/navbar/i)).toBeInTheDocument();
  });

  test("renders Hero component", () => {
    render(<Home />);
    expect(screen.getByText(/hero/i)).toBeInTheDocument();
  });

  test("renders HowItWorks component", () => {
    render(<Home />);
    expect(screen.getByText(/howitworks/i)).toBeInTheDocument();
  });

  test("renders ServicesSection component", () => {
    render(<Home />);
    expect(screen.getByText(/servicessection/i)).toBeInTheDocument();
  });

  test("renders ReadyToGetStarted component", () => {
    render(<Home />);
    expect(screen.getByText(/readytogetstarted/i)).toBeInTheDocument();
  });

  test("renders Footer component", () => {
    render(<Home />);
    expect(screen.getByText(/footer/i)).toBeInTheDocument();
  });
});