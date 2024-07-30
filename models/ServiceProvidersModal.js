const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
    shopName: { type: String },
    name: { type: String },
    description: { type: String },
    category: { type: String },
    phoneNo: { type: Number },
    emailId: { type: String },
    shopEmail: { type: String, required: true, unique: true },
    address: { type: String },
    stars: { type: Number },
    state: { type: String },
    city: { type: String },
    area: { type: String },
    postalCode: { type: String },
    isverified: { type: Boolean },
    categoryDetails: { type: String },
    pricing: { type: String },
    IBAN: { type: String },
    bankName: { type: String },
    accountHolder: { type: String },
    PPSNNumber: { type: String },
    residentsProof: { type: String },
    visaDocument: { type: String },
    drivingLicense: { type: String },
    workPermit: { type: String },
    workExperience: { type: String },
    licenseAndCertification: { type: String }
});

const Providers = mongoose.model('ServiceProviders', serviceProviderSchema);
module.exports = Providers;
