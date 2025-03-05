import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from './contact'; 

describe('Contact Component', () => {

  test('renders the Contact component', () => {
    // Render the component
    render(<Contact />);

    // Assert that the component renders the text "contact"
    const contactText = screen.getByText(/contact/i);
    expect(contactText).toBeInTheDocument();
  });

  test('does not render unexpected text', () => {
    render(<Contact />);

    // Ensure that other text (not "contact") does not exist in the document
    const unexpectedText = screen.queryByText(/some other text/i);
    expect(unexpectedText).not.toBeInTheDocument();
  });

  test('has the correct HTML structure', () => {
    const { container } = render(<Contact />); // Directly destructure container from render()
    
    // Find the first div element in the container
    const divElement = container.querySelector('div');
    expect(divElement).toBeInTheDocument();
    expect(divElement.tagName).toBe('DIV');
  });

  test('renders the component without crashing', () => {
    const { container } = render(<Contact />);

    // Check if the component is rendered into the DOM
    expect(container).toBeInTheDocument();
  });
});