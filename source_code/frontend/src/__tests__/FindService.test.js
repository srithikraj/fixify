import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import FindService from '../pages/findService';
import { getVerifiedServiceProviders } from '../api/serviceProviderApi';

// Mock the API call to return sample profiles
jest.mock('../api/serviceProviderApi');

// Mock the Navbar component (it could be a more complex component, but we only need a dummy here)
jest.mock('../components/Navbar/Navbar.jsx', () => {
  return function DummyNavbar() {
    return <div data-testid="navbar">Navbar</div>;
  };
});

// Mock the WorkerContactModal component to check open state and worker info.
jest.mock('../components/UserModal/WorkerContactModal.jsx', () => {
  return function DummyWorkerContactModal(props) {
    return (
      <div data-testid="worker-contact-modal">
        {props.open
          ? `Modal Open - ${props.worker ? props.worker.userDetails.first_name : 'No worker'}`
          : 'Modal Closed'}
      </div>
    );
  };
});

// Sample profiles to be returned by the API
const mockProfiles = [
  {
    id: '1',
    hourly_rate: 50,
    ratings: 4.2,
    services: ['Plumbing', 'Electrical'],
    userDetails: {
      first_name: 'Alice',
      last_name: 'Wonderland',
      address: {
        line1: '123 Main St',
        postal_code: '12345',
        province: 'State',
        country: 'USA'
      }
    }
  },
  {
    id: '2',
    hourly_rate: 40,
    ratings: 3.8,
    services: ['Cleaning', 'Gardening'],
    userDetails: {
      first_name: 'Bob',
      last_name: 'Builder',
      address: {
        line1: '456 Secondary Rd',
        postal_code: '67890',
        province: 'Province',
        country: 'USA'
      }
    }
  }
];

describe('FindService Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getVerifiedServiceProviders.mockResolvedValue({
      status: 200,
      data: { data: mockProfiles },
    });
  });

  test('renders service provider profiles after fetching', async () => {
    render(<FindService />);

    // Wait for profiles to be rendered on the page
    const alice = await screen.findByText('Alice Wonderland');
    const bob = await screen.findByText('Bob Builder');
    expect(alice).toBeInTheDocument();
    expect(bob).toBeInTheDocument();

    // Verify the dummy Navbar is rendered
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  test('filters profiles by skill', async () => {
    render(<FindService />);

    // Wait until both profiles are rendered
    await waitFor(() => {
      expect(screen.getByText('Alice Wonderland')).toBeInTheDocument();
      expect(screen.getByText('Bob Builder')).toBeInTheDocument();
    });

    // Open the "Skills" dropdown by clicking the button
    const skillsButton = screen.getByText(/Skills ▼/i);
    fireEvent.click(skillsButton);

    // Click on a specific skill (e.g., "Plumbing")
    const plumbingButton = screen.getByText('Plumbing');
    fireEvent.click(plumbingButton);

    // Only profiles that offer "Plumbing" should be visible (i.e. "Alice Wonderland")
    expect(screen.getByText('Alice Wonderland')).toBeInTheDocument();
    expect(screen.queryByText('Bob Builder')).toBeNull();
  });

  test('sorts profiles by rating in ascending order', async () => {
    render(<FindService />);

    // Ensure both profiles are rendered
    await waitFor(() => {
      expect(screen.getByText('Alice Wonderland')).toBeInTheDocument();
      expect(screen.getByText('Bob Builder')).toBeInTheDocument();
    });

    // Open the "Rating" dropdown and select "Low to High"
    const ratingButton = screen.getByText(/Rating ▼/i);
    fireEvent.click(ratingButton);
    const lowToHighButton = screen.getByText('Low to High');
    fireEvent.click(lowToHighButton);

    // The sorting logic should place Bob (rating 3.8) before Alice (rating 4.2)
    // We can check the order by querying the container for profile cards.
    const container = document.querySelector('.profile-container');
    const profileCards = container.querySelectorAll('.profile-card');
    expect(profileCards[0].textContent).toContain('Bob Builder');
    expect(profileCards[1].textContent).toContain('Alice Wonderland');
  });

  test('opens WorkerContactModal when "Contact" button is clicked', async () => {
    render(<FindService />);

    // Wait for the profiles to render
    await waitFor(() => {
      expect(screen.getByText('Alice Wonderland')).toBeInTheDocument();
    });

    // Find the "Contact" buttons on the rendered profile cards
    const contactButtons = screen.getAllByText('Contact');
    // Simulate clicking on the first "Contact" button (assumed to be for the first profile)
    fireEvent.click(contactButtons[0]);

    // The WorkerContactModal should now be open with the correct worker information
    const modal = await screen.findByTestId('worker-contact-modal');
    expect(modal).toHaveTextContent(/Modal Open/);
    // Ensure the modal displays the worker's first name (either "Alice" or "Bob")
    expect(modal.textContent).toMatch(/Alice|Bob/);
  });
});
