// api/price
function getTodayDate() {
  const today = new Date();
  return `${today.getFullYear().toString().slice(2)}/${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${today.getDate().toString().padStart(2, "0")}`;
}

const latestPriceData = { // 메인페이지의 시세 초기값
  date: getTodayDate(),
  price: 0,
  sell: 0,
  prevPrice: 0,
  prevSellPrice: 0,
};

export async function GET() {
 return Response.json(latestPriceData);
}

export async function POST(req : Request) {
    const body = await req.json();
    const {buy, sell, date} = body

   // 이전 가격을 저장하고 업데이트
  latestPriceData.prevPrice = latestPriceData.price;
  latestPriceData.price = buy;
  latestPriceData.prevSellPrice = latestPriceData.sell;
  latestPriceData.sell = sell;
  latestPriceData.date = date;

    return Response.json({success: true, data: latestPriceData})
}