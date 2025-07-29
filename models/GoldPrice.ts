import { Schema, Document, model, models } from 'mongoose';

export interface GoldPrice extends Document {
  buy: number;
  sell: number;
  rate: number;
  createdAt: Date;
}

const GoldPriceSchema = new Schema<GoldPrice>(
  {
    buy: { type: Number, required: true },
    sell: { type: Number, required: true },
    rate: { type: Number, required: true },
  },
  { timestamps: true }
);

const Price = models.GoldPrice || model<GoldPrice>('GoldPrice', GoldPriceSchema);
export default Price;