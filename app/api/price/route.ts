import connectDB from "@/lib/mongodb";
import Price from "@/models/GoldPrice";
import { NextResponse } from "next/server";

// api/price
export interface GoldPrice {
  _id: string,
  buy: number,
  sell: number,
  rate: number,
  createAt: Date,
  updateAt: Date
}

export async function GET () {
    try {
    await connectDB();
    console.log("MongoDB connected successfully");
    const goldPrices = await Price.find().sort({ createdAt: -1 }).limit(2);
      console.log("prices fetched:", goldPrices.length);
    return NextResponse.json({ data: goldPrices });
  } catch (error) {
    console.error('GET /api/price error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
};

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();
    const buy = formData.get('buy') as string;
    const sell = formData.get('sell') as string;
    const rate = formData.get('rate') as string;

    const price = new Price({ buy, sell, rate });
    await price.save();

    return NextResponse.json({ data: price });
  } catch (error) {
    console.error("API Error: ", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}