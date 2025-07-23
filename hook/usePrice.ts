import { useEffect, useState } from "react";

interface PriceData {
  price: number;
  sell: number;
  date: string;
  prevPrice: number;
  prevSellPrice: number;
}

// 현재 금 시세 불러오기 (1돈: 3.75g 기준)
export default function usePrice() {
  const [priceData, setPriceData] = useState<PriceData | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch("/api/price");
        const result = await res.json();
        setPriceData(result.data ?? result);
      } catch (error) {
        console.error("금 시세 불러오기 실패", error);
      }
    };

    fetchPrice();
  }, []);

  return priceData;
}
