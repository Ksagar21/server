const express = require('express');
const { GetallSignups, GetUnverifiedUsers, GetverifiedUsers, getServices, getServicesOfShop, getShops, getcart, getBookings, getcontacts } = require('../controller/admingetcontrollers');
const { adminApproval, feedBackUpdate, feedBackUpdatelikes, feedBackUpdateDislikes } = require('../controller/postcallscontroller');
const { getproviders } = require('../controller/authcontroller');
const router = express.Router();
router.get('/getshops',getShops),
router.get('/bookings',getBookings),
router.get('/getProviders',getproviders)
router.get('/getshopServices',getServicesOfShop)
// router.post('/adminApproval', adminApproval)
router.get('/getcart', getcart);
router.get('/getcontacts', getcontacts);
// router.get('/unverifiedUsers',GetUnverifiedUsers);
// router.get('/verifiedUsers',GetverifiedUsers)
module.exports = router;