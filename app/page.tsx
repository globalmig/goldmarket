'use client'
import Image from "next/image";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductData } from "@/data/productData";

interface PriceDataProps {
  buy: number,
  sell: number,
  rate: number,
  prevBuyPrice: number,
  prevSellPrice: number,
  date: string
}

export default function Home() {

  const [priceData, setPriceData] = useState<PriceDataProps | null>(null);

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

  if (!priceData) return null;

  const getCalculatedPrice = (weight: number) => {

    switch (weight) {
      case 37.5:
        return Math.round(priceData.buy * 10 * priceData.rate);
      case 50:
        return Math.round(priceData.buy * 13.33 * priceData.rate);
      case 75:
        return Math.round(priceData.buy * 20 * priceData.rate);
      case 100:
        return Math.round(priceData.buy * 26.66666666666667 * priceData.rate);
      case 112.5:
        return Math.round(priceData.buy * 30 * priceData.rate);
      case 187.5:
        return Math.round(priceData.buy * 50 * priceData.rate);
      case 375:
        return Math.round(priceData.buy * 100 * priceData.rate);
      case 500:
        return Math.round(priceData.buy * 133.333 * priceData.rate);
      case 1000:
        return Math.round(priceData.buy * 266.6666666666667 * priceData.rate);
      default:
        return typeof priceData.buy === "number" ? priceData.buy : undefined;
    }
  }

  const updatePrice = Number(priceData.buy ?? 0) - Number(priceData.prevBuyPrice ?? 0);
  const updateSell = Number(priceData.sell ?? 0) - Number(priceData.prevSellPrice ?? 0);
  const todayPrice = Number(priceData.buy).toLocaleString(); // 살때 시세
  const todaySell = Number(priceData.sell).toLocaleString(); // 팔때 시세
  const todayDiff = Math.abs(updatePrice);
  const todaySellDiff = Math.abs(updateSell);

  const formatDate = (today: string | Date): string => {
    const date = today instanceof Date ? today : new Date(today);

    if (isNaN(date.getTime())) {
      const now = new Date();
      return `${now.getFullYear()}년 ${String(now.getMonth() + 1).padStart(2, '0')}월 ${String(now.getDate()).padStart(2, '0')}일`;
    }

    const year = String(date.getFullYear()).slice(0);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
  }

  const recommendProduct = ProductData
    .filter(product => product.subCategory === "사자 골드바")
    .filter(product => product.weight >= 37.5)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  return (
    <>

      <main>
        <div className='main-banner display-flex'>

          <div>
            <p>한국금시장거래소</p>
            <div className="display-flex">
              <h3>오늘의 시세</h3>
              <span>{formatDate(priceData.date)}</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th> </th>
                  <th><p>내가 살 때<span> (VAT포함)</span></p></th>
                  <th><p>내가 팔 때</p></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>순금 시세<br /><span>(자사골드바기준)</span></p>
                  </td>
                  <td>
                    <h3>{todayPrice}원</h3>
                    <div className="display-flex">
                      {priceData.buy > priceData.prevBuyPrice ? (
                        <Image src="/icons/quote_up.png" alt="시세상승 아이콘" width={10} height={5} />
                      ) : priceData.buy === priceData.prevBuyPrice ? (
                        <Image src="/icons/quote_same.png" alt="시세변동 없음 아이콘" width={15} height={4} />
                      ) : (
                        <Image src="/icons/quote_down.png" alt="시세하락 아이콘" width={10} height={5} />
                      )}
                      <p>{todayDiff.toLocaleString()}</p>
                    </div>
                  </td>
                  <td>
                    <h3>{todaySell}원</h3>
                    <div className="display-flex">
                      {priceData.sell > priceData.prevSellPrice ? (
                        <Image src="/icons/quote_up.png" alt="시세상승 아이콘" width={10} height={5} />
                      ) : priceData.sell === priceData.prevSellPrice ? (
                        <Image src="/icons/quote_same.png" alt="시세변동 없음 아이콘" width={15} height={4} />
                      ) : (
                        <Image src="/icons/quote_down.png" alt="시세하락 아이콘" width={10} height={5} />
                      )}
                      <p>{todaySellDiff.toLocaleString()}</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <p>정확한 기준가를 적용하여 매입은 높게, 판매는 낮은 금액으로 시세 적용합니다.</p>
              <ul>
                <li className="display-flex">
                  <div>
                    <Image src="/icons/inquiry.png" alt="실시간 상담 아이콘" width={15} height={15} />
                  </div>
                  <p>실시간 상담 02-543-5551</p>
                </li>
                <li className="display-flex">
                  <div>
                    <Image src="/icons/location.png" alt="장소 아이콘" width={15} height={22} />
                  </div>
                  <p>압구정역 4번 출구 근방에 위치</p>
                </li>
                <li className="display-flex">
                  <div>
                    <Image src="/icons/park.png" alt="주차 아이콘" width={15} height={20} />
                  </div>
                  <p>주차 가능 (매장입구에 주차하실 수 있습니다.)</p>
                </li>
                <li className="display-flex">
                  <div>
                    <Image src="/icons/naver.png" alt="네이버 플레이스 아이콘" width={15} height={15} />
                  </div>
                  <p>
                    <Link href="https://naver.me/GV2dKf99">
                      네이버 플레이스 이동하기 {`>`}
                    </Link>
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <Image src="/images/main_banner2.jpg" alt='캐나다 코스트코 계약 체결' fill priority/>
          </div>

        </div>
      </main>

      <article className="recommend">
        <div>
          <div>
            <h1>상품 추천</h1>
            <h3>RECOMMEND ITEM</h3>
          </div>
          <Slider {...settings} className="recommend-slide-wrapper">
            {recommendProduct.map(product => {

              const price = getCalculatedPrice(product.weight);
              const roundedPrice = price !== undefined
              ? Math.ceil(price/1000) * 1000
              : undefined

              return <div key={product.id}>
                <Link href={`/골드바/detail/${product.id}`}>
                  <div>
                    <Image src={`/images/goldbar/사자골드바_${product.weight.toString()}g.jpg`} alt={`사자 골드바 ${product.weight.toLocaleString()}g`} width={345} height={345} />
                  </div>
                </Link>
                <div>
                  <p>{product.name} {product.weight.toLocaleString()}g</p>
                  <p>{product.subname}</p>
                  <p>{roundedPrice?.toLocaleString()}원</p>
                </div>
              </div>
            })}
          </Slider>
        </div>
      </article>

    </>
  );
}
