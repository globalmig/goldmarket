'use client'
import { useEffect, useState } from "react";

export interface PriceData {
  buy: number,
  sell: number,
  rate: number,
  prevBuyPrice: number,
  prevSellPrice: number,
  date: string,
}

// 현재 금 시세 불러오기 (1돈: 3.75g 기준)
export default function usePrice() {
  const [priceData, setPriceData] = useState<PriceData | null>(null);

  useEffect(() => {
    async function fetchPrice() {
      try {
        const res = await fetch("/api/price");
        const result = await res.json();

        const [latestPrice, prevPrice] = result.data;

        setPriceData({
          buy: latestPrice.buy,
          sell: latestPrice.sell,
          rate: latestPrice.rate,
          prevBuyPrice: prevPrice?.buy ?? latestPrice.buy,
          prevSellPrice: prevPrice?.sell ?? latestPrice.sell,
          date: latestPrice.date
        });
      } catch (err) {
        console.error(err);
      }
    }
    fetchPrice();
  }, []);

  return priceData;
}
