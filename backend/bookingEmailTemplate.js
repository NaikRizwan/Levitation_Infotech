// bookingEmailTemplate.js
const generateBookingEmail = (formData, totalPrice) => {
  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="text-align: center;">Booking Information</h2>
        <h3 style="text-align: center;">JK RR TOUR & TRAVELS</h3>
        <p style="text-align: center; color: green; font-size: 18px;">Your booking is confirmed!</p>
  
        <div style="margin-top: 20px;">
          <div style="display: flex; justify-content: space-between;">
            <div>
              <p><strong>Full Name:</strong> ${formData.fullname}</p>
              <p><strong>Email:</strong> ${formData.email}</p>
              <p><strong>Mobile Number:</strong> ${formData.mobile}</p>
            </div>
            <div>
              <p><strong>Destination Name:</strong> ${formData.name}</p>
              <p><strong>Current Location:</strong> ${formData.location}</p>
              <p><strong>Number of Members:</strong> ${formData.members}</p>
            </div>
          </div>
  
          <div style="margin-top: 20px; display: flex; justify-content: space-between;">
            <div>
              <p><strong>Check-in Date:</strong> ${formData.checkinDate}</p>
              <p><strong>Check-out Date:</strong> ${formData.checkoutDate}</p>
              <p><strong>Pick-up Destination:</strong> ${formData.pickupDestination}</p>
            </div>
            <div>
              <p><strong>Gender:</strong> ${formData.gender}</p>
              <p><strong>Age:</strong> ${formData.age}</p>
            </div>
          </div>
  
          <div style="text-align: center; margin-top: 20px;">
            <h3>Total Price: ₹${totalPrice}</h3>
          </div>
        </div>
      </div>
    `;
};

module.exports = generateBookingEmail;
