import React from 'react';
import { render, screen } from '@testing-library/react';
import Aboutus from "../pages/Aboutus" 
jest.mock('../assets/logo.png', () => 'mocked-logo.png');

describe('AboutUs Component', () => {
  beforeEach(() => {
    render(<Aboutus />);
  });

  test('renders without crashing', () => {
    const aboutUsElement = screen.getByText(/ABOUT US/i);
    expect(aboutUsElement).toBeInTheDocument();
  });

  test('displays Team section with all team members', () => {
    expect(screen.getByText(/MEET OUR TEAM/i)).toBeInTheDocument();
    expect(screen.getByText(/THE DREAM TEAM/i)).toBeInTheDocument();

    const teamMembers = ['Arshita', 'Geetika', 'Bhargav', 'Raghul', 'Rajveer', 'Rithik'];
    teamMembers.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  test('renders correct number of team member images', () => {
    const teamImages = screen.getAllByRole('img');
    expect(teamImages).toHaveLength(6);
  });

  test('applies correct styles to main container', () => {
    const mainContainer = screen.getByText(/ABOUT US/i).parentElement.parentElement;
    expect(mainContainer).toHaveStyle({
      display: 'flex',
      'flex-direction': 'column',
      'min-height': '100vh'
    });
  });

  test('renders video with correct source', () => {
    const video = screen.getByText(/Your browser does not support the video tag./i).parentElement;
    const source = video.querySelector('source');
    expect(source).toHaveAttribute('src', 'vid.mp4');
    expect(source).toHaveAttribute('type', 'video/mp4');
  });

  test('team member images have correct attributes', () => {
    const teamImages = screen.getAllByRole('img');
    teamImages.forEach((img, index) => {
      expect(img).toHaveAttribute('src', `${index + 1}.jpg`);
      expect(img).toHaveStyle({
        'border-radius': '50%',
        width: '140px',
        height: '140px'
      });
    });
  });
});