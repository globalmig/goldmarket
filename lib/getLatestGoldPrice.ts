import Price, { GoldPrice } from "@/models/GoldPrice";
import connectDB from "./mongodb";

export async function getLatestGoldPrice(): Promise<GoldPrice | null> {
  await connectDB();
  const goldPrices = await Price.findOne().sort({ createdAt: -1 });
  return goldPrices ? JSON.parse(JSON.stringify(goldPrices.toObject())) : null;
}