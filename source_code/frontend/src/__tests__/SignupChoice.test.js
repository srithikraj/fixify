import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import SignupChoice from '../pages/SignupChoice';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('SignupChoice Component', () => {
  let navigate;

  beforeEach(() => {
    navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    render(<SignupChoice />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the component with title and description', () => {
    expect(screen.getByText('Join Our Community')).toBeInTheDocument();
    expect(screen.getByText('Choose how you\'d like to be part of our platform:')).toBeInTheDocument();
  });

  test('renders customer and worker cards', () => {
    expect(screen.getByText('Customer')).toBeInTheDocument();
    expect(screen.getByText('Find services and get things done')).toBeInTheDocument();
    expect(screen.getByText('Worker')).toBeInTheDocument();
    expect(screen.getByText('Offer your skills and earn money')).toBeInTheDocument();
  });

  test('selects customer card on click', () => {
      // Simulate clicking the "Customer" card
      fireEvent.click(screen.getByText('Customer'));

      // Verify that the "Customer" card is selected
      // expect(screen.getByText('Customer').closest('div')).toHaveStyle('border: 2px solid #1976D2');

      // Simulate clicking the "Continue" button
      fireEvent.click(screen.getByText('Continue'));

      // Verify that the navigate function is called with the correct path
      expect(navigate).toHaveBeenCalledWith('/create-account');
  });

  test('selects worker card on click', () => {
    fireEvent.click(screen.getByText('Worker'));

      // Verify that the "Customer" card is selected
      // expect(screen.getByText('Customer').closest('div')).toHaveStyle('border: 2px solid #1976D2');

      // Simulate clicking the "Continue" button
      fireEvent.click(screen.getByText('Continue'));

      // Verify that the navigate function is called with the correct path
      expect(navigate).toHaveBeenCalledWith('/service-provider');  });

  test('navigates to create-account on continue click when customer is selected', () => {
    fireEvent.click(screen.getByText('Customer'));
    fireEvent.click(screen.getByText('Continue'));
    expect(navigate).toHaveBeenCalledWith('/create-account');
  });

  test('navigates to service-provider on continue click when worker is selected', () => {
    fireEvent.click(screen.getByText('Worker'));
    fireEvent.click(screen.getByText('Continue'));
    expect(navigate).toHaveBeenCalledWith('/service-provider');
  });

  test('continue button is disabled when no selection is made', () => {
    expect(screen.getByText('Continue')).toBeDisabled();
  });

  test('navigates to signin on login link click', () => {
    fireEvent.click(screen.getByText('Log in here'));
    expect(navigate).toHaveBeenCalledWith('/signin');
  });
});
