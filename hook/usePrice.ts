import { useEffect, useState } from "react";

interface PriceData {
  buy: number;
  sell: number;
  rate: number;
  date?: string;
  prevBuyPrice: number;
  prevSellPrice: number;
}

const defaultPrice: PriceData = {
  buy: 642000,
  sell: 546500,
  rate: 0,
  prevBuyPrice: 0,
  prevSellPrice: 0
};

// 현재 금 시세 불러오기 (1돈: 3.75g 기준)
export default function usePrice() {
  const [priceData, setPriceData] = useState<PriceData>(defaultPrice);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch("/api/price");
        const result = await res.json();

        if (!Array.isArray(result.data)) {
          console.warn("API 데이터 형식 오류");
          return;
        }

        const [latestPrice, previousPrice] = result.data;

        if (latestPrice) {
          setPriceData({
            buy: latestPrice.buy,
            sell: latestPrice.sell,
            rate: latestPrice.rate,
            date: latestPrice.createdAt || latestPrice.date,
            prevBuyPrice: previousPrice?.buy || 0,
            prevSellPrice: previousPrice?.sell || 0
          });
        }
      } catch (error) {
        console.error("금 시세 불러오기 실패", error);
      }
    };

    fetchPrice();
  }, []);

  return priceData;
}
