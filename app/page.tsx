'use client'
import MainSlide from "@/compoennts/MainSlide";
import Image from "next/image";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import usePrice from "@/hook/usePrice";


export default function Home() {

  const priceData = usePrice();

  if (!priceData) return null;

  const updatePrice = priceData.price - priceData.prevPrice; // 시세 변동 차액 구하기
  const updateSell = priceData.sell - priceData.prevSellPrice;
  const todayPrice = Number(priceData.price).toLocaleString(); // 살때 시세
  const todaySell = Number(priceData.sell).toLocaleString(); // 팔때 시세
  const todayDiff = Math.abs(updatePrice).toLocaleString();
  const todaySellDiff = Math.abs(updateSell).toLocaleString();

  const formatDate = (today: string): string => {
    const date = new Date(today);
    const year = String(date.getFullYear()).slice(2); // "25"
    const month = String(date.getMonth() + 1).padStart(2, '0'); // "07"
    const day = String(date.getDate()).padStart(2, '0'); // "21"
    return `${year}/${month}/${day}`;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>

      <main>
        <MainSlide />
        <div>
          <h1>정확한 기준가를 적용하여 매입은 높게, 판매는 낮은 금액으로 시세 적용합니다</h1>
          <table>
            <thead>
              <tr>
                <th> </th>
                <th><p>살때 <span>(VAT포함)</span></p></th>
                <th><p>팔때</p></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p><span>순금 시세 </span>자사골드바기준</p>
                  {priceData.date ? <p>{formatDate(priceData.date)}기준</p> : <p>오늘 기준</p>}
                </td>
                <td>
                  <p>{todayPrice}원</p>
                  <div className="display-flex">
                    {priceData.price > priceData.prevPrice ? <Image src="/icons/quote_up.png" alt="시세변동 아이콘" width={15} height={10} /> : <Image src="/icons/quote_down.png" alt="시세변동 아이콘" width={15} height={10} />
                    }
                    <p>{todayDiff}</p>
                  </div>
                </td>
                <td>
                  <p>{todaySell}원</p>
                  <div className="display-flex">
                    {priceData.sell > priceData.prevSellPrice ? <Image src="/icons/quote_up.png" alt="시세변동 아이콘" width={15} height={10} /> : <Image src="/icons/quote_down.png" alt="시세변동 아이콘" width={15} height={10} />
                    }
                    <p>{todaySellDiff}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      <article className="recommend">
        <div>
          <div>
            <h2>상품 추천</h2>
            <p>RECOMMEND ITEM</p>
          </div>
          <Slider {...settings} className="recommend-slide-wrapper">
            <div>
              <Image src="/images/recommend_item_1.png" alt='호랑이 골드바 100g' width={345} height={500} />
            </div>
            <div>
              <Image src="/images/recommend_item_2.png" alt='골드바 수납함' width={345} height={500} />
            </div>
            <div>
              <Image src="/images/recommend_item_3.png" alt='사자 골드바 100g' width={345} height={500} />
            </div>
            <div>
              <Image src="/images/recommend_item_4.png" alt='순금 뱀상패' width={345} height={500} />
            </div>
            <div>
              <Image src="/images/recommend_item_5.png" alt='호랑이 골드바 50g' width={345} height={500} />
            </div>
            <div>
              <Image src="/images/recommend_item_6.png" alt='사자 골드바 50g' width={345} height={500} />
            </div>
          </Slider>
        </div>
      </article>

    </>
  );
}
