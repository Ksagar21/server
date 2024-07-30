const express = require('express');
const {  addServices, uploadfile, upload, addCart, contact } = require('../controller/postcallscontroller');
const { deleteCart } = require('../controller/deletecontroller');
const { updateServices } = require('../controller/putcallcontroller');
const { createBooking, userstatusverify } = require('../controller/authcontroller');

const router = express.Router();
router.post('/addService',addServices);
router.post('/contact',contact);
router.post('/addToCart',addCart);
// router.post('/upload',upload.single('file'), uploadfile);
router.post('/checkout',createBooking)
router.delete('/removeCart',deleteCart);
router.put('/updateService',updateServices);
router.put('/profileVerify',userstatusverify)
module.exports = router;
