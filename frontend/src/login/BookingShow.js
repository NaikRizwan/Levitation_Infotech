// import React, { useEffect, useState } from "react";
// import { useUser } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import axios from "axios";
// import {
//   FaSpinner,
//   FaUser,
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaUsers,
//   FaCalendarAlt,
//   FaRupeeSign,
// } from "react-icons/fa";

// const Wrapper = styled.section`
//   .profile-container {
//     background-color: #f8f9fa;
//     padding: 20px;
//     border-radius: 10px;
//   }

//   .profile-card {
//     background: #ffffff;
//     padding: 20px;
//     border-radius: 10px;
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   }

//   .loading-spinner {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     height: 100vh;
//   }

//   .spinner {
//     animation: spin 1s linear infinite;
//     font-size: 2rem;
//     color: #007bff;
//   }

//   @keyframes spin {
//     0% {
//       transform: rotate(0deg);
//     }
//     100% {
//       transform: rotate(360deg);
//     }
//   }

//   .user-info {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//   }

//   .user-info .card-title,
//   .user-info .card-subtitle {
//     margin: 0;
//   }

//   .icon {
//     margin-right: 5px;
//   }

//   .booking-card {
//     border: 1px solid #e7e7e7;
//     border-radius: 10px;
//   }

//   .booking-card .card-body {
//     display: flex;
//     flex-direction: column;
//   }

//   .booking-card .row {
//     margin: 0;
//   }
// `;
// const BookingShow = () => {
//   const { state } = useUser();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const email = state.email;

//   useEffect(() => {
//     if (!state.loggedIn) {
//       navigate("/login");
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`/profile/${email}`);
//         setBookings(response.data.bookings);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [email, state.loggedIn, navigate]);

//   if (loading) {
//     return (
//       <div className="loading-spinner">
//         <FaSpinner className="spinner" /> Loading...
//       </div>
//     );
//   }

//   return (
//     <Wrapper>
//       <div className="container mt-5 profile-container">
//         <h2 className="text-center mb-4">JK RR TOUR & TRAVELS</h2>
//         <div className="row">
//           <div className="col-12">
//             <div className="card profile-card">
//               <div className="card-body">
//                 <div className="user-info">
//                   <h5 className="card-title">
//                     <FaUser className="icon" /> {state.name}
//                   </h5>
//                   <h6 className="card-subtitle mb-2 text-muted">
//                     <FaEnvelope className="icon" /> {email}
//                   </h6>
//                 </div>
//                 <p className="card-text">Bookings:</p>
//                 {bookings.length > 0 ? (
//                   bookings.map((booking, index) => (
//                     <div key={index} className="card mb-3 booking-card">
//                       <div className="card-body">
//                         <h5 className="card-title">Booking {index + 1}</h5>
//                         <div className="row">
//                           <div className="col-md-6">
//                             <p>
//                               <FaUser className="icon" />
//                               <strong> Full Name:</strong> {booking.fullname}
//                             </p>
//                             <p>
//                               <FaPhone className="icon" />
//                               <strong> Mobile Number:</strong> {booking.mobile}
//                             </p>
//                             <p>
//                               <FaMapMarkerAlt className="icon" />
//                               <strong> Location:</strong> {booking.location}
//                             </p>
//                             <p>
//                               <FaUsers className="icon" />
//                               <strong> Members:</strong> {booking.members}
//                             </p>
//                           </div>
//                           <div className="col-md-6">
//                             <p>
//                               <FaCalendarAlt className="icon" />
//                               <strong> Check-in Date:</strong>{" "}
//                               {booking.checkinDate}
//                             </p>
//                             <p>
//                               <FaCalendarAlt className="icon" />
//                               <strong> Check-out Date:</strong>{" "}
//                               {booking.checkoutDate}
//                             </p>
//                             <p>
//                               <FaMapMarkerAlt className="icon" />
//                               <strong> Pick-up Destination:</strong>{" "}
//                               {booking.pickupDestination}
//                             </p>
//                             <p>
//                               <FaRupeeSign className="icon" />
//                               <strong> Total Price:</strong> ₹
//                               {booking.totalPrice}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="no-bookings">No bookings found.</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Wrapper>
//   );
// };

// export default BookingShow;
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {
  FaSpinner,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUsers,
  FaCalendarAlt,
  FaRupeeSign,
} from "react-icons/fa";

const Wrapper = styled.section`
  font-family: "Arial, sans-serif";
  background-color: #f0f2f5;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .profile-container {
    background-color: #fff;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 900px;
  }

  .profile-card {
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }

  .loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .spinner {
    animation: spin 1s linear infinite;
    font-size: 2rem;
    color: #007bff;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .user-info .card-title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .user-info .card-subtitle {
    font-size: 1rem;
    color: #6c757d;
  }

  .icon {
    margin-right: 10px;
    color: #007bff;
  }

  .booking-card {
    border: 1px solid #e7e7e7;
    border-radius: 15px;
    background-color: #f8f9fa;
    margin-bottom: 20px;
  }

  .booking-card .card-body {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  .booking-card .row {
    margin: 0;
  }

  .no-bookings {
    text-align: center;
    font-size: 1.2rem;
    color: #6c757d;
    margin-top: 20px;
  }

  .card-title {
    font-size: 1.3rem;
    font-weight: bold;
    color: #343a40;
  }

  .card-subtitle {
    font-size: 1rem;
    color: #6c757d;
  }

  p {
    font-size: 1rem;
    margin-bottom: 10px;
  }

  .price {
    color: green;
    font-weight: bold;
  }
`;

const BookingShow = () => {
  const { state } = useUser();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const email = state.email;

  useEffect(() => {
    if (!state.loggedIn) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`/profile/${email}`);
        setBookings(response.data.bookings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [email, state.loggedIn, navigate]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <FaSpinner className="spinner" /> Loading...
      </div>
    );
  }

  return (
    <Wrapper>
      <div className="container profile-container">
        <h2 className="text-center mb-4">JK RR TOUR & TRAVELS</h2>
        <div className="profile-card">
          <div className="user-info">
            <h5 className="card-title">
              <FaUser className="icon" /> {state.name}
            </h5>
            <h6 className="card-subtitle mb-2">
              <FaEnvelope className="icon" /> {email}
            </h6>
          </div>
          <p className="card-text">Bookings:</p>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <div key={index} className="card mb-3 booking-card">
                <div className="card-body">
                  <h5 className="card-title">Booking {index + 1}</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <p>
                        <FaUser className="icon" />
                        <strong> Full Name:</strong> {booking.fullname}
                      </p>
                      <p>
                        <FaPhone className="icon" />
                        <strong> Mobile Number:</strong> {booking.mobile}
                      </p>
                      <p>
                        <FaMapMarkerAlt className="icon" />
                        <strong> Location:</strong> {booking.location}
                      </p>
                      <p>
                        <FaUsers className="icon" />
                        <strong> Members:</strong> {booking.members}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <FaCalendarAlt className="icon" />
                        <strong> Check-in Date:</strong> {booking.checkinDate}
                      </p>
                      <p>
                        <FaCalendarAlt className="icon" />
                        <strong> Check-out Date:</strong> {booking.checkoutDate}
                      </p>
                      <p>
                        <FaMapMarkerAlt className="icon" />
                        <strong> Pick-up Destination:</strong>{" "}
                        {booking.pickupDestination}
                      </p>
                      <p className="price">
                        <FaRupeeSign className="icon" />
                        <strong> Total Price:</strong> ₹{booking.totalPrice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-bookings">No bookings found.</p>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default BookingShow;
