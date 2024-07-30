const Cart = require("../models/CartModal");

exports.deleteCart = async (req, res) => {
    console.log(req.query,"inhihihi")
    try {
   
      const carts = await Cart.findByIdAndDelete({ _id:req.query.cartId});
      if (!carts || carts.length === 0) {
        return res.status(404).json({ message: 'No carts found for the user' });
      }
      res.status(200).json({
       
        message: "Removed From Cart",
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: e.message });
    }
  };