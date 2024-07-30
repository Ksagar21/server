const Bookings = require("../models/BookingsModal");
const Cart = require("../models/CartModal");
const Contacts = require("../models/contact");
const Providers = require("../models/ServiceProvidersModal");
const Services = require("../models/servicesModel");
const User = require("../models/usermodel");

////HE

exports.getServicesOfShop = async (req, res) => {
  try {
    console.log(req.query);
    const lists = await Services.find(req.query);
    res
      .status(200)
      .json({
        lists,
        message: "Listed All Services Successfully for The Shop",
      });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.getShops = async (req, res) => {
  try {
    console.log(req.query);
    const lists = await Providers.find({ category: req.query.category });
    res
      .status(200)
      .json({
        lists,
        message: "Listed All Services Successfully for The Shop",
      });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.getcart = async (req, res) => {
  try {
    const { userEmail } = req.query;
    const carts = await Cart.find({ userEmail });

    const serviceIds = carts.map((cart) => cart.serviceId);

    const services = await Services.find({ _id: { $in: serviceIds } });

    const cartItems = carts.map((cart) => {
      const service = services.find(
        (service) => service._id.toString() === cart.serviceId.toString()
      );
      return {
        cartId: cart._id,
        date: cart.date,
        time: cart.time,
        userEmail: cart.userEmail,
        service: service,
      };
    });
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + (item.service.price || 0),
      0
    );

    res.status(200).json({
      cartItems,
      totalPrice,
      message: "Cart items listed",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};

exports.getBookings = async (req, res) => {
  const { userEmail, shopEmail } = req.query;
  let query = {};
  if (userEmail) {
    query["userDetails.userEmail"] = userEmail;
  }
  if (shopEmail) {
    query["servicesBooked.service.shopEmail"] = shopEmail;
  }
  try {
    let lists = await Bookings.find(query);
    if (shopEmail) {
      lists = lists.map((booking) => {
        const filteredServices = booking.servicesBooked.filter(
          (service) => service.service.shopEmail === shopEmail
        );
        const datas = booking.servicesBooked;
        return { ...booking.toObject(), servicesBooked: filteredServices };
      });
    }
    res
      .status(200)
      .json({
        lists,
        message: "Listed All Bookings Successfully for The Shop",
      });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.getcontacts = async (req, res) => {
  try {
    console.log(req.query);
    const lists = await Contacts.find(req.query);
    res.status(200).json({ lists, message: "Listed all contacts" });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
