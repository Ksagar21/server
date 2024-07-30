const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name:{type:String,required: true},
    message:{type:String},
    email:{type:String, required:true},
});

const Contacts = mongoose.model('Contacts', ContactSchema);
module.exports = Contacts;