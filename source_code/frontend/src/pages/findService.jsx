import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar.jsx';
import WorkerContactModal from '../components/UserModal/WorkerContactModal.jsx';
import { getAllServiceProviders, getVerifiedServiceProviders } from '../api/serviceProviderApi';

const services_offered = [
  "Plumbing", "Electrical", "Carpentry", "Painting", "Cleaning", 
  "HVAC Repair", "Gardening", "Pest Control", "Roofing", "Masonry", 
  "Appliance Repair", "Flooring", "Locksmith", "Window Cleaning", 
  "Handyman", "Drywall Repair", "Tile Work", "Furniture Assembly",
  "Pressure Washing", "Pool Maintenance"
]

const Navbar2 = ({ onFilter, onSort }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleSort = (category, order) => {
    onSort(category, order);
    setActiveDropdown(null);  // Close the dropdown after selection
  };

  const handleFilter = (skills) => {
    onFilter(skills);
    setActiveDropdown(null);  // Close the dropdown after selection
  };

  const handleCloseDropdown = () => {
    setActiveDropdown(null);
  }
  useEffect(() => {
    // Close dropdown if clicked outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
        handleCloseDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Add option clear all filters and sorting
  const handleClearAll = () => {
    onFilter(null); // Reset filters
    onSort(null, null); // Reset sorting
    setActiveDropdown(null); // Close all dropdowns
  }

  return (
    <div className="navbar2">
      {/* Rating Dropdown */}
      {/* Services Dropdown */}
      <div className="dropdown">
        <button className="nav-btn" onClick={() => toggleDropdown('skills')}>
          Skills ▼
        </button>
        {/* Dropdown scrollable list for skills */}
        {activeDropdown === 'skills' && (
          <div className="dropdown-list" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {services_offered.map((skill) => (
              <button key={skill} onClick={() => handleFilter(skill)}>
                {skill}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="dropdown">
        <button className="nav-btn" onClick={() => toggleDropdown('rating')}>
          Rating ▼
        </button>
        {activeDropdown === 'rating' && (
          <div className="dropdown-list">
            <button onClick={() => handleSort('rating', 'asc')}>Low to High</button>
            <button onClick={() => handleSort('rating', 'desc')}>High to Low</button>
          </div>
        )}
      </div>

      {/* Price Dropdown */}
      <div className="dropdown">
        <button className="nav-btn" onClick={() => toggleDropdown('price')}>
          Price ▼
        </button>
        {activeDropdown === 'price' && (
          <div className="dropdown-list">
            <button onClick={() => handleSort('price', 'asc')}>Low to High</button>
            <button onClick={() => handleSort('price', 'desc')}>High to Low</button>
          </div>
        )}
      </div>

      {/* Show button to reset all filters*/}
      <div className="dropdown">
        <button className="nav-btn" onClick={handleClearAll}>
          x Filters
        </button>
      </div>


      {/* Location Dropdown 
      <div className="dropdown">
        <button className="nav-btn" onClick={() => toggleDropdown('location')}>
          Location ▼
        </button>
        {activeDropdown === 'location' && (
          <div className="dropdown-list">
            <button onClick={() => handleSort('location', 'nearest')}>Nearest</button>
            <button onClick={() => handleSort('location', 'farthest')}>Farthest</button>
          </div>
        )}
      </div>*/}
    </div>
  );
};

const FindService = () => {

  const [profileData, setProfileData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [sortedProfiles, setSortedProfiles] = useState([]);

  useEffect(() => {
    // Fetch profile data from backend API
    getVerifiedServiceProviders()
      .then((response) => {
        if (response.status === 200) {
          console.log("Profile data:", response.data.data);
          response.data.data.forEach((profile) => {
            profile.photo = `photo.png`;
            profile.rate = profile.hourly_rate;
          });
          setProfileData( [...response.data.data]);
          setSortedProfiles([...response.data.data]);
          setFilteredProfiles([...response.data.data]); 
        }
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  const handleContactClick = (worker) => {
    setSelectedWorker(worker);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedWorker(null);
  };

  const filterProfiles = (skills) => {
    if (!skills) {
      // If no skill is selected, reset to show all profiles
      setFilteredProfiles(profileData);
      setSortedProfiles(profileData);
      return;
    }
  
    const filtered = profileData.filter((profile) => {
      // Ensure case-insensitive comparison
      return profile.services.some((service) =>
        service.toLowerCase() === skills.toLowerCase()
      );
    });
  
    setFilteredProfiles(filtered);
    setSortedProfiles(filtered); // Update sortedProfiles to reflect the filtered data
    console.log("Filtered profiles:", filtered);
  };

  

  const sortProfiles = (category, order) => {
    let sortedData = [...filteredProfiles]; // Sort filteredProfiles, not profileData
  
    if (category === 'rating') {
      sortedData.sort((a, b) => order === 'asc' ? a.ratings - b.ratings : b.ratings - a.ratings);
    } else if (category === 'price') {
      sortedData.sort((a, b) => {
        const priceA = a.rate;
        const priceB = b.rate;
        return order === 'asc' ? priceA - priceB : priceB - priceA;
      });
    } /*else if (category === 'location') {
      // Assuming a simple location sorting based on alphabetical order
      sortedData.sort((a, b) => {
        if (order === 'nearest') {
          return a.location.localeCompare(b.location);
        } else {
          return b.location.localeCompare(a.location);
        }
      });
    }*/
  
    console.log("Sorted data:", sortedData);
    setSortedProfiles(sortedData);
  };

  const getNameString = (firstName, lastName) => {
    if (!firstName || !lastName) {
      return "Unknown";
    }
    return `${firstName} ${lastName}`;
  };

  const getLocationString = (address) => {
    if (!address
      || !address.line1
      || !address.postal_code
      || !address.province
      || !address.country) {
      return "Unknown";
    }
    return `${address.line1}, ${address.postal_code}, ${address.province}, ${address.country}`.toUpperCase();
  };

  return (
    <div>
      <Navbar />
      <Navbar2 onFilter={filterProfiles} onSort={sortProfiles} />
      <div className="profile-container">
        {sortedProfiles.map((profile) => (
          <div key={profile.id} className="profile-card">
            <div className="card-inner">
              {/* Front side of the card */}
              <div className="card-front">
                <img src={profile.photo} alt={getNameString(profile.userDetails.first_name, profile.userDetails.last_name)} className="profile-photo" />
                <h3>{getNameString(profile.userDetails.first_name, profile.userDetails.last_name)}</h3>
                <h3>${profile.rate}/hr</h3>
                <p>
                  <img src="star.png" alt="star" className="rating-star" />
                  {profile.ratings} / 5
                </p>
              </div>

              {/* Back side of the card */}
              <div className="card-back">
                <p><strong>Location:</strong> {getLocationString(profile.userDetails.address)} </p>
                <p><strong>Services:</strong> {profile.services.join(", ")}</p>
                <button 
                  className="contact-btn" 
                  onClick={() => handleContactClick(profile)}
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Render WorkerContactModal */}
      <WorkerContactModal 
        open={modalOpen} 
        handleClose={handleCloseModal} 
        worker={selectedWorker} 
      />

      <style jsx>{`
        /* Styles as before */
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-image: url('se18.jpg');
          background-size: cover;
          background-attachment: fixed;
          background-position: center center;
        }

        .navbar {
          background-color: #333;
          color: #fff;
          padding: 15px;
          text-align: center;
        }

        /* Updated Navbar2 styles */
        .navbar2 {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 50%;
          max-width: 600px;
          background-color: white;
          padding: 10px 0;
          border-radius: 40px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          margin: 100px auto 20px;
        }


        .nav-btn {
          padding: 10px 20px;
          font-size: 18px;
          color: black;
          border: none;
          background: none;
          cursor: pointer;
          font-weight: bold;
          position: relative;
        }
        
        .nav-btn:hover {
          color: #007bff; /* Change color on hover */
        }

        .nav-btn:focus {
          outline: none;
        }

        .nav-btn:hover {
          color: #007bff;
        }

        /* Dropdown Container */
        .dropdown {
          position: relative;
        }

        /* Dropdown List */
        .dropdown-list {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          background-color: white;
          border: 1px solid #ccc;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          width: 140px;
          text-align: center;
          z-index: 1000;
        }

        /* Dropdown Buttons */
        .dropdown-list button {
          padding: 10px;
          font-size: 16px;
          color: black;
          background: none;
          border: none;
          cursor: pointer;
          width: 100%;
          font-weight: bold;

        }

        .dropdown-list button:hover {
          background-color:rgb(0, 0, 0);
          color: white;
          font-width: bold;
        }
        
        .profile-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 120px;
          padding: 40px 20px;
          margin: 45px auto 0;
          max-width: 1200px;
        }
          @media (max-width: 768px) {
          .profile-container {
            grid-template-columns: 1fr;
            gap: 60px;
            padding: 20px;
          }
        }

        .profile-card {
          width: 90%;
          height: 400px;
          perspective: 1000px;
        }

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }

        .profile-card:hover .card-inner {
          transform: rotateY(180deg);
        }

        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
        }

        .card-front {
          background-color: #fff;
          padding: 20px;
        }

        .card-back {
          background-color: #f5f5f5;
          padding: 20px;
          transform: rotateY(180deg);
        }

        .profile-photo {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
        }

        h3 {
          font-size: 18px;
          margin: 10px 0;
        }

        p {
          font-size: 16px;
        }

        .contact-btn {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .rating-star {
          width: 18px;
          height: 18px;
          margin-right: 5px;
        }

        .contact-btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default FindService;