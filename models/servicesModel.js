const mongoose = require('mongoose');

const ServicesSchema = new mongoose.Schema({
    serviceName:{type:String, required:true},
    description:{type:String, required:true},
    duration:{type:String, required:true},
    price:{type:Number, required:true},
    category:{type:String},
    serviceType:{type:String},
    image:{type:String},
    shopEmail: { type: String,required:true },
});

const Services = mongoose.model('Services', ServicesSchema);
module.exports = Services;