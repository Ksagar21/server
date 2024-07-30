const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true },

  servicesBooked: [
    { 
      date: { type: String, required: true },
      time: { type: String, required: true },
      bookingfee: { type: String },
      service: {
        category: { type: String, required: true },
        _id: { type: String, required: true },
        serviceName: { type: String, required: true },
        price: { type: Number, required: true },
        shopEmail: { type: String, required: true },
        price: { type: Number, required: true },
      },
    },
  ],
  userDetails: {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phoneNo: { type: String, required: true },
    userEmail: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  paymentDetails: {
    cardNumber: { type: String, required: true },
    cardHolderName: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
    amount: { type: Number, required: true },
    transactionId: { type: String, required: true },
    status: { type: String, required: true },
  },
  approved: { type: Boolean, required: true},
});

const Bookings = mongoose.model("Bookings", BookingSchema);
module.exports = Bookings;
