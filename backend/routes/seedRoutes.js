const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const Offer = require('../models/Offer');

const sampleListings = [
  {
    title: 'Calculus: Early Transcendentals (8th Edition)',
    description: 'Clean textbook, highlighted only in chapter 3. Essential for Engineering Math 1 & 2.',
    price: 35,
    category: 'Books',
    condition: 'Like New',
    listingType: 'For Sale',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    location: 'North Campus Library',
    sellerName: 'Rohan Sharma',
    sellerEmail: 'rohan.s@university.edu',
    sellerPhone: '9876543210',
    status: 'Available',
  },
  {
    title: 'TI-84 Plus CE Graphing Calculator',
    description: 'Color screen, battery holds charge for weeks. Comes with charging cable and sliding cover.',
    price: 60,
    category: 'Electronics',
    condition: 'Good',
    listingType: 'For Sale',
    imageUrl: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80',
    location: 'Science Block B',
    sellerName: 'Ananya Verma',
    sellerEmail: 'ananya.v@university.edu',
    sellerPhone: '9876543211',
    status: 'Available',
  },
  {
    title: 'Ergonomic Mesh Desk Chair',
    description: 'Adjustable height and lumbar support. Perfect for late-night dorm study sessions.',
    price: 45,
    category: 'Furniture',
    condition: 'Like New',
    listingType: 'For Sale',
    imageUrl: 'https://images.unsplash.com/photo-1580481077195-c328a37ea71a?auto=format&fit=crop&w=800&q=80',
    location: 'Hostel 4 Ground Floor',
    sellerName: 'Vikram Patel',
    sellerEmail: 'vikram.p@university.edu',
    sellerPhone: '9876543212',
    status: 'Available',
  },
  {
    title: 'Logitech MX Master 3 Wireless Mouse',
    description: 'Super ergonomic mouse for coding and design work. Used for 4 months, works flawlessly.',
    price: 50,
    category: 'Electronics',
    condition: 'Good',
    listingType: 'For Sale',
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    location: 'CS Lab 3',
    sellerName: 'Dev Mehta',
    sellerEmail: 'dev.m@university.edu',
    sellerPhone: '9876543213',
    status: 'Available',
  },
  {
    title: 'Hero Sprint Campus Bicycle (18 Speed)',
    description: 'Great for getting between hostel and lecture halls. Includes bike lock and helmet.',
    price: 55,
    category: 'Transport',
    condition: 'Good',
    listingType: 'For Sale',
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    location: 'Sports Complex Parking',
    sellerName: 'Aarav Joshi',
    sellerEmail: 'aarav.j@university.edu',
    sellerPhone: '9876543214',
    status: 'Available',
  },
  {
    title: 'Dorm Study Desk Lamp with Wireless Charger Base',
    description: 'LED desk lamp with 3 color temperatures and phone wireless charging base. Moving out, take it for free!',
    price: 0,
    category: 'Furniture',
    condition: 'Like New',
    listingType: 'Free',
    imageUrl: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80',
    location: 'Girls Hostel Wing C',
    sellerName: 'Sneha Gupta',
    sellerEmail: 'sneha.g@university.edu',
    sellerPhone: '9876543215',
    status: 'Available',
  },
  {
    title: 'Data Structures & Algorithms in Java (Robert Lafore)',
    description: 'Great book for CS semester 3. Open to exchange for a Python machine learning book.',
    price: 20,
    category: 'Books',
    condition: 'Good',
    listingType: 'Exchange',
    imageUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=800&q=80',
    location: 'Central Canteen',
    sellerName: 'Kabir Singhania',
    sellerEmail: 'kabir.s@university.edu',
    sellerPhone: '9876543216',
    status: 'Available',
  },
  {
    title: 'Pack of 5 Unused Engineering Grid Notebooks',
    description: 'Brand new grid notebooks, unopened plastic wrap. Leftover from last semester.',
    price: 10,
    category: 'Stationery',
    condition: 'Brand New',
    listingType: 'For Sale',
    imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
    location: 'Stationery Shop Gate 1',
    sellerName: 'Priya Nair',
    sellerEmail: 'priya.n@university.edu',
    sellerPhone: '9876543217',
    status: 'Available',
  },
];

router.post('/', async (req, res) => {
  try {
    await Listing.deleteMany({});
    await Offer.deleteMany({});
    const inserted = await Listing.insertMany(sampleListings);

    await Offer.create([
      {
        listingId: inserted[0]._id,
        buyerName: 'Amit Shah',
        buyerEmail: 'amit.s@university.edu',
        buyerPhone: '9123456789',
        offerPrice: 30,
        message: 'Hey Rohan, can you do $30? I can pick it up today at the library.',
        status: 'Pending',
      },
      {
        listingId: inserted[1]._id,
        buyerName: 'Pooja Bhatt',
        buyerEmail: 'pooja.b@university.edu',
        buyerPhone: '9123456780',
        offerPrice: 55,
        message: 'Does it come with original manual? Interested!',
        status: 'Pending',
      },
    ]);

    res.status(201).json({
      message: 'Database seeded successfully with 8 listings and 2 sample offers!',
      count: inserted.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
