import React from 'react';
import { render, screen } from '@testing-library/react';
import SignupWorker from './signupWorker'; // Adjust the import path as necessary

describe('SignupWorker Component', () => {

  test('renders the SignupWorker component', () => {
    // Render the component
    render(<SignupWorker />);

    // Assert that the component renders the text "signupWorker"
    const signupWorkerText = screen.getByText(/signupWorker/i);
    expect(signupWorkerText).toBeInTheDocument();
  });

  test('does not render unexpected text', () => {
    render(<SignupWorker />);

    // Ensure that other text (not "signupWorker") does not exist in the document
    const unexpectedText = screen.queryByText(/some other text/i);
    expect(unexpectedText).not.toBeInTheDocument();
  });

  test('has the correct HTML structure', () => {
    const { container } = render(<SignupWorker />); // Directly destructure container from render()
    
    // Find the first div element in the container
    const divElement = container.querySelector('div');
    expect(divElement).toBeInTheDocument();
    expect(divElement.tagName).toBe('DIV');
  });

  test('renders the component without crashing', () => {
    const { container } = render(<SignupWorker />);

    // Check if the component is rendered into the DOM
    expect(container).toBeInTheDocument();
  });
});