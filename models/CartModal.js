const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    date:{type:String,required: true},
    time:{type:String,required: true},
    serviceId:{type:String, required:true},
    userEmail:{type:String, required:true},
});

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;