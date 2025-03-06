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
import Navbar from '../components/Navbar/navbar.jsx';
import WorkerContactModal from '../components/UserModal/WorkerContactModal.jsx';
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
      <Navbar />
      
      <div className="profile-container">
        {profileData.map((profile) => (
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

        .profile-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 120px;
          padding: 40px 20px;
          margin: 90px auto 0;
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
