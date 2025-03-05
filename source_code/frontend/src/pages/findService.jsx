// import React from 'react';
// import Navbar from '../components/Navbar/Navbar.jsx';

// const FindService = () => {
//   // Sample profile data (this can be replaced by backend API calls later)
//   const profileData = [
//     {
//       id: 1,
//       name: 'John Doe',
//       photo: 'photo.png',
//       rate: '30$/Hour',
//       rating: 4,
//       location: 'New York, USA',
//       skills: 'Plumber, Carpenter',
//     },
//     {
//       id: 2,
//       name: 'Jane Smith',
//       photo: 'photo.png',
//       rate: '35$/Hour',
//       rating: 5,
//       location: 'London, UK',
//       skills: 'Electrician',
//     },
//     {
//       id: 3,
//       name: 'Emily Johnson',
//       photo: 'photo.png',
//       rate: '70$/Hour',
//       rating: 4.5,
//       location: 'Toronto, Canada',
//       skills: 'Carpenter, Painter',
//     },
//     {
//       id: 4,
//       name: 'Chris Lee',
//       photo: 'photo.png',
//       rate: '54$/Hour',
//       rating: 3.5,
//       location: 'Berlin, Germany',
//       skills: 'Electrician, Carpenter',
//     },
//     {
//       id: 5,
//       name: 'Samantha Brown',
//       photo: 'photo.png',
//       rate: '29$/Hour',
//       rating: 4,
//       location: 'Sydney, Australia',
//       skills: 'Construction, Carpenter, Painter, Electrician',
//     },
//     {
//       id: 6,
//       name: 'Michael Miller',
//       photo: 'photo.png',
//       rate: '30$/Hour',
//       rating: 4.5,
//       location: 'San Francisco, USA',
//       skills: 'Plumber',
//     },
//     // You can add more profile cards here
//   ];

//   return (
//     <div>
//       <Navbar />
      
//       <div className="profile-container">
//         {profileData.map((profile) => (
//           <div key={profile.id} className="profile-card">
//             <div className="card-inner">
//               {/* Front side of the card */}
//               <div className="card-front">
//                 <img src={profile.photo} alt={profile.name} className="profile-photo" />
//                 <h3>{profile.name}</h3>
//                 <h3>{profile.rate}</h3>
//                 <p>
//                 <img src="star.png" alt="star" className="rating-star" />
//                   {profile.rating} / 5
//                 </p>
                
//               </div>

//               {/* Back side of the card */}
//               <div className="card-back">
//                 <p><strong>Location:</strong> {profile.location}</p>
//                 <p><strong>Skills:</strong> {profile.skills}</p>
//                 <button className="contact-btn">Contact</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <style jsx>{`
//           body {
//           margin: 0;
//           padding: 0;
//           font-family: Arial, sans-serif;
//           background-image: url('se18.jpg'); /* Replace with your image path */
//           background-size: cover; /* Make the image cover the entire page */
//           background-attachment: fixed; /* Ensure the background stays fixed when scrolling */
//           background-position: center center; /* Center the background image */
//         }

//         /* Navbar Section Styling */
//         .navbar {
//           background-color: #333;
//           color: #fff;
//           padding: 15px;
//           text-align: center;
//         }

//         /* Profile container uses CSS Grid */
//         .profile-container {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr); /* Exactly 3 cards per row */
//           gap: 120px; /* Ample space between the cards */
//           padding: 40px 20px; /* Padding around the grid */
//           margin: 90px auto 0;  /* Center the grid */
//           max-width: 1200px; /* Set a max width for the grid */
//         }

//         .profile-card {
//           width: 90%; /* Reduced width to make space on left and right */
//           height: 400px; /* Fixed height */
//           perspective: 1000px; /* Create perspective for 3D effect */
//         }

//         .card-inner {
//           position: relative;
//           width: 100%;
//           height: 100%;
//           transform-style: preserve-3d;
//           transition: transform 0.6s;
//         }

//         .profile-card:hover .card-inner {
//           transform: rotateY(180deg); /* Flip the card on hover */
//         }

//         .card-front,
//         .card-back {
//           position: absolute;
//           width: 100%; /* Full width */
//           height: 100%; /* Full height */
//           backface-visibility: hidden; /* Hide the back face when flipped */
//           border-radius: 30px;
//           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: space-evenly;
//         }

//         .card-front {
//           background-color: #fff;
//           padding: 20px;
//         }

//         .card-back {
//           background-color: #f5f5f5;
//           padding: 20px;
//           transform: rotateY(180deg); /* Flip the back side initially */
//         }

//         .profile-photo {
//           width: 120px;
//           height: 120px;
//           border-radius: 50%;
//           object-fit: cover;
//         }

//         h3 {
//           font-size: 18px;
//           margin: 10px 0;
//         }

//         p {
//           font-size: 16px;
//         }

//         .contact-btn {
//           padding: 10px 20px;
//           background-color: #007bff;
//           color: white;
//           border: none;
//           border-radius: 5px;
//           cursor: pointer;
//         }
        
//         .rating-star {
//           width: 18px; /* Adjust the size of the star */
//           height: 18px;
//           margin-right: 5px; /* Space between the star and rating */
//         }
//         .contact-btn:hover {
//           background-color: #0056b3;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default FindService;
import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar.jsx';
import WorkerContactModal from '../components/UserModal/WorkerContactModal.jsx';
const FindService = () => {
  // Sample profile data
  const profileData = [
    {
      id: 1,
      name: 'Raghul',
      photo: 'photo.png',
      rate: '90$/Hour',
      rating: 6,
      location: 'Vaughan. ON',
      skills: 'Playboy, Cassanova',
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
  // Icons for filter buttons
  const icons = {
    SERVICE: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
        <path d="M480-400ZM80-160v-400q0-33 23.5-56.5T160-640h120v-80q0-33 23.5-56.5T360-800h240q33 0 56.5 23.5T680-720v80h120q33 0 56.5 23.5T880-560v400H80Zm240-200v40h-80v-40h-80v120h640v-120h-80v40h-80v-40H320ZM160-560v120h80v-40h80v40h320v-40h80v40h80v-120H160Zm200-80h240v-80H360v80Z" />
      </svg>
    ),
    LOCATION: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
        <path d="M480-360q56 0 101-27.5t71-72.5q-35-29-79-44.5T480-520q-49 0-93 15.5T308-460q26 45 71 72.5T480-360Zm0-200q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0 374q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
      </svg>
    ),
    RATE: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
        <path d="M444-200h70v-50q50-9 86-39t36-89q0-42-24-77t-96-61q-60-20-83-35t-23-41q0-26 18.5-41t53.5-15q32 0 50 15.5t26 38.5l64-26q-11-35-40.5-61T516-710v-50h-70v50q-50 11-78 44t-28 74q0 47 27.5 76t86.5 50q63 23 87.5 41t24.5 47q0 33-23.5 48.5T486-314q-33 0-58.5-20.5T390-396l-66 26q14 48 43.5 77.5T444-252v52Z" />
      </svg>
    ),
    RATING: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black">
        <path d="M480-260q68 0 123.5-38.5T684-400H276q25 63 80.5 101.5T480-260ZM312-520l44-42 42 42 42-42-84-86-86 86 42 42Zm250 0 42-42 44 42 42-42-86-86-84 86 42 42ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z"/>
      </svg>
    ),
    
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  const handleContactClick = (worker) => {
    setSelectedWorker(worker);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedWorker(null);
  };

  return (
    <div>
      {/* <Navbar /> */}

      {/* Dropdown Filter Bar */}
      <div className="filter-bar">
        {["SERVICE", "LOCATION", "RATE", "RATING"].map((category) => (
          <div key={category} className="dropdown">
            <button className="dropbtn">
              {icons[category]} <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>

            </button>
            <div className="dropdown-content">
              {category === "SERVICE" && (
                <>
                  <span>Electrician</span>
                  <span>Plumber</span>
                  <span>Carpenter</span>
                  <span>Painter</span>
                </>
              )}
              {category === "LOCATION" && (
                <>
                  <span>Nearest</span>
                  <span>Farthest</span>
                </>
              )}
              {category === "RATE" && (
                <>
                  <span>Max to Min</span>
                  <span>Min to Max</span>
                </>
              )}
              {category === "RATING" && (
                <>
                  <span>Max to Min</span>
                  <span>Min to Max</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Profile Cards */}
      <div className="profile-container">
        {profileData.map((profile) => (
          <div key={profile.id} className="profile-card">
            <div className="card-inner">
              {/* Front side of the card */}
              <div className="card-front">
                <img src={profile.photo} alt={profile.name} className="profile-photo" />
                <h3>{profile.name}</h3>
                <h3>{profile.rate}</h3>
                <p>{profile.rating} / 5</p>
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
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background-image: url('se18.jpg');
          background-size: cover;
          background-attachment: fixed;
          background-position: center center;
        }

        /* Filter Bar Styling */
        .filter-bar {
          display: flex;
          justify-content: center;
          gap: 10px;
          background-color: white;
          padding: 15px 0px;
          margin: 120px auto 30px;
          width: 40%;
          border-radius: 15px;
          box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .dropdown {
          position: relative;
        }

        .dropbtn {
          background: white;
          color: black;
          border: 2px solid black;
          padding: 10px 15px;
          font-size: 16px;
          border-radius: 8px;
            font-weight: bold; /* Make text bold */
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .dropbtn:hover {
          background: black;
          color: white;
        }
        
        .dropbtn:hover svg {
        fill: white; /* Change icon color to white */
        }

        /* Show dropdown on hover */
        .dropdown:hover .dropdown-content {
          display: flex;
        }

        .dropdown-content {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border: 1px solid black;
          border-radius: 5px;
          display: none;
          flex-direction: column;
          min-width: 150px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          z-index: 100;
        }

        .dropdown-content span {
          padding: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dropdown-content span:hover {
          background: black;
          color: white;
        }

        .profile-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 120px;
          padding: 40px 20px;
          margin: 10px auto 0;
          max-width: 1200px;
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

        .contact-btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default FindService;