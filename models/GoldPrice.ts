import { Schema, Document, model, models } from 'mongoose';

export interface GoldPrice extends Document {
  price: number;
  createdAt: Date;
}

const GoldPriceSchema = new Schema<GoldPrice>(
  {
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Price = models.Price || model<GoldPrice>('GoldPrice', GoldPriceSchema);
export default Price;