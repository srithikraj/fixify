import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar.jsx';
import WorkerContactModal from '../components/UserModal/WorkerContactModal.jsx';

const Navbar2 = ({ onSort }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const handleSort = (category, order) => {
    onSort(category, order);
    setActiveDropdown(null);  // Close the dropdown after selection
  };

  const handleFilter = (skills) => {
    onFilter(skills);  // Trigger filter
    setActiveDropdown(null);  // Close the dropdown after selection
  };

  return (
    <div className="navbar2">
      {/* Rating Dropdown */}
      {/* Services Dropdown */}
      <div className="dropdown">
        <button className="nav-btn" onClick={() => toggleDropdown('skills')}>
          Skills ▼
        </button>
        {activeDropdown === 'skills' && (
          <div className="dropdown-list">
            <button onClick={() => handleFilter('Electrician')}>Electrician</button>
            <button onClick={() => handleFilter('Plumber')}>Plumber</button>
            <button onClick={() => handleFilter('Carpenter')}>Carpenter</button>
            <button onClick={() => handleFilter('Painter')}>Painter</button>
            <button onClick={() => handleFilter('Construction')}>Construction</button>
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

      {/* Location Dropdown */}
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
      </div>
    </div>
  );
};

const FindService = () => {
  const profileData = [
    {
      id: 1,
      name: 'John Doe',
      photo: 'photo.png',
      rate: '30$/Hour',
      rating: 4,
      location: 'New York, USA',
      skills: 'Plumber, Carpenter',
      email: 'john.doe@example.com',
      isVerified: true,
      reviews: [
        { reviewer: "Alice Smith", rating: 4, comment: "Efficient & Quick plumber, fixed my sink quickly!", date: "2025-02-15" },
        { reviewer: "Bob Johnson", rating: 3.5, comment: "Good quality work, but a bit late.", date: "2025-01-20" },
      ],
    },
    {
      id: 2,
      name: 'Jane Smith',
      photo: 'photo.png',
      rate: '35$/Hour',
      rating: 5,
      location: 'London, UK',
      skills: 'Electrician',
      email: 'jane.smith@example.com',
      isVerified: false,
      reviews: [
        { reviewer: "Charlie Brown", rating: 5, comment: "Friendly and efficient service, highly recommend!", date: "2025-03-01" },
        { reviewer: "Diana Lee", rating: 5, comment: "Good communication, fixed my wiring efficiently.", date: "2025-02-10" },
      ],
    },
    {
      id: 3,
      name: 'Emily Johnson',
      photo: 'photo.png',
      rate: '70$/Hour',
      rating: 4.5,
      location: 'Toronto, Canada',
      skills: 'Carpenter, Painter',
      email: 'emily.johnson@example.com',
      isVerified: true,
      reviews: [
        { reviewer: "Eve Davis", rating: 4.5, comment: "Good quality carpentry work!", date: "2025-02-25" },
      ],
    },
    {
      id: 4,
      name: 'Chris Lee',
      photo: 'photo.png',
      rate: '54$/Hour',
      rating: 3.5,
      location: 'Berlin, Germany',
      skills: 'Electrician, Carpenter',
      email: 'chris.lee@example.com',
      isVerified: true,
      reviews: [
        { reviewer: "Frank Miller", rating: 3, comment: "Good communication, but could improve efficiency.", date: "2025-01-15" },
        { reviewer: "Grace Kim", rating: 4, comment: "Friendly and good quality carpentry skills.", date: "2025-02-05" },
      ],
    },
    {
      id: 5,
      name: 'Samantha Brown',
      photo: 'photo.png',
      rate: '29$/Hour',
      rating: 4,
      location: 'Sydney, Australia',
      skills: 'Construction, Carpenter, Painter, Electrician',
      email: 'samantha.brown@example.com',
      isVerified: false,
      reviews: [
        { reviewer: "Henry Wilson", rating: 4, comment: "Efficient & Quick, good value for money.", date: "2025-03-02" },
      ],
    },
    {
      id: 6,
      name: 'Michael Miller',
      photo: 'photo.png',
      rate: '30$/Hour',
      rating: 4.5,
      location: 'San Francisco, USA',
      skills: 'Plumber',
      email: 'michael.miller@example.com',
      isVerified: true,
      reviews: [
        { reviewer: "Ivy Chen", rating: 4.5, comment: "Friendly and quick plumbing service.", date: "2025-02-20" },
        { reviewer: "Jack Taylor", rating: 4, comment: "Good quality and good communication.", date: "2025-01-30" },
      ],
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [sortedProfiles, setSortedProfiles] = useState(profileData);
  const [filteredProfiles, setFilteredProfiles] = useState(profileData);

  const handleContactClick = (worker) => {
    setSelectedWorker(worker);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedWorker(null);
  };

  const filterProfiles = (skills) => {
    const filteredData = profileData.filter(profile =>{
      const profileSkills = profile.skills.toLowerCase();
      return profileSkills.includes(skills.toLowerCase());
    }
    );
    setFilteredProfiles(filteredData);
    
    setSortedProfiles(filteredData);  // Ensure sorted profiles reflect the filtered data

  };

  

  const sortProfiles = (category, order) => {
    let sortedData = [...filteredProfiles];  // Sort filteredProfiles, not profileData

    if (category === 'rating') {
      sortedData.sort((a, b) => order === 'asc' ? a.rating - b.rating : b.rating - a.rating);
    } else if (category === 'price') {
      sortedData.sort((a, b) => {
        const priceA = parseFloat(a.rate.replace('$', '').replace('/Hour', ''));
        const priceB = parseFloat(b.rate.replace('$', '').replace('/Hour', ''));
        return order === 'asc' ? priceA - priceB : priceB - priceA;
      });
    } else if (category === 'location') {
      // Assuming a simple location sorting based on alphabetical order
      sortedData.sort((a, b) => {
        if (order === 'nearest') {
          return a.location.localeCompare(b.location);
        } else {
          return b.location.localeCompare(a.location);
        }
      });
    }
    setSortedProfiles(sortedData);
    setFilteredProfiles(sortedData);  // Update filteredProfiles after sorting

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
                <img src={profile.photo} alt={profile.name} className="profile-photo" />
                <h3>{profile.name}</h3>
                <h3>{profile.rate}</h3>
                <p>
                  <img src="star.png" alt="star" className="rating-star" />
                  {profile.rating} / 5
                </p>
              </div>

              {/* Back side of the card */}
              <div className="card-back">
                <p><strong>Location:</strong> {profile.location}</p>
                <p><strong>Skills:</strong> {profile.skills}</p>
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