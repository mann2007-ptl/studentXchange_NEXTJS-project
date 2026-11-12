const express = require('express');
const cors = require('cors');

const listingRoutes = require('./routes/listingRoutes');
const offerRoutes = require('./routes/offerRoutes');
const seedRoutes = require('./routes/seedRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/listings', listingRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/seed', seedRoutes);

app.get('/', (req, res) => {
  res.send('StudentXchange Backend API is running...');
});

module.exports = app;
