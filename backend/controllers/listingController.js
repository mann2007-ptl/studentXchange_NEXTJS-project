const Listing = require('../models/Listing');

exports.getListings = async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const listings = await Listing.find(filter).sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    res.json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createListing = async (req, res) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(listing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
