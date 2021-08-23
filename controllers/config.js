const {
  venueServices,
  organizerServices,
  locations,
} = require("../config/services");

class ConfigController {
  async getVenueServices(req, res, next) {
    try {
      res.status(200).json({ venueServices });
    } catch (error) {
      next(error);
    }
  }

  async getOrganizerServices(req, res, next) {
    try {
      res.status(200).json({ organizerServices });
    } catch (error) {
      next(error);
    }
  }

  async getLocations(req, res, next) {
    try {
      res.status(200).json({ locations });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ConfigController();
