import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignupCustomer from '../pages/signupCustomer';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Mock axios
jest.mock('axios');

describe('SignupCustomer Component', () => {
  let navigate;

  beforeEach(() => {
    navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    render(<SignupCustomer />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the signup form with all fields', () => {
    // Use getByRole to specifically target the button with the text "Create Account"
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  
    // Alternatively, use getAllByText if you want to check for both instances
    const createAccountElements = screen.getAllByText('Create Account');
    expect(createAccountElements).toHaveLength(2);
  
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone Number (e.g., 1234567890)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Address Line 1')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Address Line 2 (optional)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Postal Code (e.g., A1A 1A1)')).toBeInTheDocument();
    expect(screen.getByText('Select a Province')).toBeInTheDocument();
  });
  

  test('validates form fields correctly', () => {
    // Use getByRole to specifically target the button with the text "Create Account"
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
  
    expect(screen.getByText('First Name is required')).toBeInTheDocument();
    expect(screen.getByText('Last Name is required')).toBeInTheDocument();
    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
    expect(screen.getByText('Phone must be 10 digits (e.g., 1234567890)')).toBeInTheDocument();
    expect(screen.getByText('Address Line 1 is required')).toBeInTheDocument();
    expect(screen.getByText('Invalid postal code (e.g., A1A 1A1)')).toBeInTheDocument();
    expect(screen.getByText('Province is required')).toBeInTheDocument();
  });
  
  
  

});
