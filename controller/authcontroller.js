const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const config = require("../config");
const Admin = require("../models/adminmodel");
const Providers = require("../models/ServiceProvidersModal");
const { v4: uuidv4 } = require('uuid');
const Bookings = require("../models/BookingsModal");
const Cart = require("../models/CartModal");

exports.signup = async (req, res) => {
  try {
    console.log(req.body)
    const { username, email, password,role} =
      req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      role,
      isverified:role ==="user"?true : false,
      password: hashedPassword,
    });
    await newUser.save();
    return res.json({ message: " User Signed Up Successful" });
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern && error.keyPattern.username) {
        return res.status(400).json({ error: "Username already exists" });
      }
    }
    return res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // const validuser = await User.findOne({ email });
    // if (validuser) {
    //   const isPasswordValid = await bcrypt.compare(password, validuser.password);
    //   if (!isPasswordValid) {
    //     return res.status(401).json({ message: "Invalid credentials" });
    //   }
    //   const token = jwt.sign(
    //     { userId: validuser._id, role:validuser.role },
    //     config.jwtSecret,
    //     {
    //       expiresIn: "1h",
    //     }
    //   );
    //  return res.json({ token,role:validuser.role });
    // }
    const user = await User.findOne({ email });
    const userdetails = await Providers.findOne({ shopEmail:email });
    if (!user) {
      return res.status(401).json({ message: "User Not Exists" });
    }
    if (!user.isverified&&user.role==="provider") {
      return res.status(200).json({role: user.role,email: user.email,isverified:user.isverified, message: "User is a Service Provider", messages: "User is Not Authenticated" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      config.jwtSecret,
      {
        expiresIn: "1h",
      }
    );
    if(userdetails){
      return res.status(200).json({ token,role: user.role,email: user.email,isverified:userdetails.isverified,category:userdetails.category, message: "User is a Service Provider" });
    }
    return res.json({ token,role: user.role,email: user.email,username: user.username});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.AdminSignup = async (req, res) => {
  try {
    const { name, email, password,referalId } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "Admin already registered" });
    }
    const AdminreferalId ="He@referalId.com"
    if(referalId!== AdminreferalId){
      return res.status(403).json({message: "Referal Id is not a validId"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({
      username:name,
      email,role:"admin",isverified:true,
      password: hashedPassword,
    });

    await newAdmin.save();
    return res.status(200).json({ message: "Admin Signup successful" });
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern && error.keyPattern.name) {
        return res.status(400).json({ error: "Username already exists" });
      }
    }
    return res.status(400).json({ error: error.message });
  }
};


////HE

exports.addServiceProviders = async (req, res) => {
  const {shopName,name,
    shopEmail,
    description,
    category,
    phoneNo,
    address,
    state,
    city,
    area,
    postalCode,categoryDetails,
    pricing,IBAN,bankName,accountHolder,PPSNNumber,residentsProof,visaDocument,drivingLicense,workPermit,worExperience,licenseAndCertification,
   }= req.body
  console.log(shopEmail)
  try {
    const services = new Providers({
      shopName,
      name,
      description,
      category,
      phoneNo,
      address,
      state,
      city,shopEmail,
      area,
      isverified: false,
      categoryDetails,
      pricing,IBAN,bankName,accountHolder,PPSNNumber,residentsProof,visaDocument,drivingLicense,workPermit,worExperience,licenseAndCertification,
    })
    await services.save();
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const providers = new User({
    //   username:name,
    //   email: shopEmail,
    //   password: hashedPassword,
    //   role:"provider",
    //   phoneNo: phoneNo,
    //   isverified: false,
    // })
    // await providers.save();

    res.status(200).json({
      message: "Provider Added Successfully",
      user: services,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};



exports.createBooking = async (req, res) => {
  const {
    servicesBooked,
    userDetails,
    paymentDetails
  } = req.body;
  try {
    console.log(req)
    const bookingCount = await Bookings.countDocuments();
    const bookingId = `HEBOID${bookingCount + 1}`;
    const transactionId = Math.floor(Math.random() * 1000000000);
    paymentDetails.transactionId = transactionId;
    paymentDetails.status ="Success"
    // const updatedPaymentDetails = paymentDetails.map(payment => ({
    //   ...payment,
    //   transactionId
    // }));
    
    const booking = new Bookings({
      bookingId,
      servicesBooked,
      userDetails,
      paymentDetails,
      approved:false,
    });

    await booking.save();
    const email = userDetails.userEmail
    await Cart.deleteMany({userEmail: email });
    res.status(200).json({
      message: "Booking Created Successfully",
      booking
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getproviders = async (req,res)=>{
try {

  const providers = await Providers.find(req.query);
  res.status(200).json({providers,
    message: "Listed Providers Successfully",
  });
} catch (error) {
  
}
}

exports.userstatusverify = async (req, res) => {

  const { isverified,emailId, } = req.body;
    try {
      const providers = await Providers.findOne({shopEmail:emailId});
      const user = await User.findOne({email: emailId});

      if (!providers) {
        return res.status(404).json({
          message: "Provider not found",
        });
      }
      providers.isverified = isverified || providers.isverified;
      user.isverified = isverified || user.isverified;
console.log(providers,isverified);
      await providers.save();
      await user.save();
      res.status(200).json({
        message: "Profile updated successfully",
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };