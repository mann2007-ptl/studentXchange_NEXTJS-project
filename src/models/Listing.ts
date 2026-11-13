import mongoose, { Schema, models, model } from 'mongoose';

const listingSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    category: {
      type: String,
      required: true,
      enum: ['Books', 'Electronics', 'Furniture', 'Stationery', 'Transport', 'Other'],
    },
    condition: {
      type: String,
      required: true,
      enum: ['Brand New', 'Like New', 'Good', 'Fair'],
    },
    listingType: {
      type: String,
      required: true,
      enum: ['For Sale', 'Free', 'Exchange'],
      default: 'For Sale',
    },
    imageUrl: { type: String, required: true },
    location: { type: String, required: true, default: 'Main Campus' },
    sellerName: { type: String, required: true },
    sellerEmail: { type: String, required: true },
    sellerPhone: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Available', 'Reserved', 'Sold'],
      default: 'Available',
    },
  },
  { timestamps: true }
);

const Listing = models.Listing || model('Listing', listingSchema);
export default Listing;
