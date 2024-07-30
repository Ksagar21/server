
const Cart = require("../models/CartModal");
const Contacts = require("../models/contact");
const Services = require("../models/servicesModel");
const User = require("../models/usermodel");

exports.ProfieUpdate = async (req, res) => {
  try {
    const { email, aadharNo, gender, phoneNo, role } = req.body;
    const user = await User.findOne({ email });
    user.aadharNo = aadharNo;
    user.gender = gender;
    user.phoneNo = phoneNo;
    user.role = role;
    await user.save();
    res.status(200).json({
      message: "Profile updated successfully",
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
// exports.adminApproval = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(200).json({
//         message: "User not found",
//       });
//     }
//     const lastUser = await User.findOne().sort({ userId: -1 });
//     let userId = "CKOOO1";
//     if (userId) {
//       const lastUserId = lastUser.userId;
//       const lastUserIdInt = parseInt(lastUserId.substring(2), 10);
//       userId = "CK" + String(lastUserIdInt + 1).padStart(5, "0");
//     }
//     user.isverified = true;
//     await user.save();
//     return res.status(200).json({
//       message: "User Verified Successfully",
//     });
//   } catch (e) {
//     return res.status(500).json({ error: e.message });
//   }
// };

exports.addServices = async (req, res) => {
  const {serviceName,
    description,
    shopEmail,
    duration,
    category,serviceType,
    // shopName,
    image,
    price,
}= req.body
  try {
    const existingService = await Services.findOne({ serviceName, shopEmail });
    if (existingService) {
      return res.status(400).json({
        message: "Service already exists for this shop",
      });
    }
     const services = new Services({
      serviceName,
    description,
    shopEmail,category,serviceType,
    price,image,duration
    })
    await services.save();
    res.status(200).json({
      message: "Services Added Successfully",
     
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


exports.contact = async (req, res) => {
  const {name,email,message
}= req.body
  try {
     const contact = new Contacts({
      name,email,message
    })
    await contact.save();
    res.status(200).json({
      message: "Request Submitted Successfully",
  
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};









exports.uploadfile = async (req, res) => {
 console.log(req)
  const file = req.file;
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
     //ACL: 'public-read',
  };
  console.log(params,"hhh")
  console.log(file,"file")
  try {

  s3.upload(params, (err, data) => {
    console.log(params,data)
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json({ fileUrl: data.Location });
  });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};



///he


exports.addCart = async (req, res) => {

  const {
  serviceId,
  userEmail,
  date,time,
}= req.body
  try {
    const existingService = await Cart.findOne({ serviceId, userEmail });

    if (existingService) {
      return res.status(400).json({
        message: "Already Added in Cart",
      });
    }
    const cart = new Cart({
      serviceId,
      userEmail,date,time
    })
    await cart.save();
    res.status(200).json({
      message: "Services Added to Cart successfully",
     
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};






