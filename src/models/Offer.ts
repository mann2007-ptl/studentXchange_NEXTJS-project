import mongoose, { Schema, models, model } from 'mongoose';

const offerSchema = new Schema(
  {
    listingId: {
      type: Schema.Types.ObjectId,
      ref: 'Listing',
      required: true,
    },
    buyerName: { type: String, required: true },
    buyerEmail: { type: String, required: true },
    buyerPhone: { type: String, default: '' },
    offerPrice: { type: Number, required: true },
    message: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

const Offer = models.Offer || model('Offer', offerSchema);
export default Offer;
