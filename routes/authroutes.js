const express = require('express');
const authController = require('../controller/authcontroller');

const router = express.Router();
router.post('/providerRegistration',authController.addServiceProviders);
router.post('/signup', authController.signup);
 router.post('/login', authController.login);

router.post('/adminSignup', authController.AdminSignup)
module.exports = router;
