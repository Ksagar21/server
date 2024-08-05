const Services = require("../models/servicesModel");

exports.updateServices = async (req, res) => {
   
    const { serviceName, description, price,_id,duration,image } = req.body;
    try {
      const service = await Services.findById(_id);
      if (!service) {
        return res.status(404).json({
          message: "Service not found",
        });
      }
      service.serviceName = serviceName || service.serviceName;
      service.description = description || service.description;
      service.price = price || service.price;
       service.image = image || service.image;
      service.duration = duration || service.duration;

      await service.save();
      res.status(200).json({
        message: "Service updated successfully",
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
