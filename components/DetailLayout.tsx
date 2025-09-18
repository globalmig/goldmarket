'use client'
import { ProductData } from "@/data/productData";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import TellButton from "./TellButton";

export default function DetailLayout() {

    const params = useParams();
    const pathname = usePathname();
    const { id } = params;
    const productId = Number(id);
    const product = ProductData.find(p => p.id === productId);

    const [priceData, setPriceData] = useState<{ buy: number; rate: number } | null>(null);

    useEffect(() => {
        async function fetchPrice() {
            try {
                const res = await fetch("/api/price");
                const result = await res.json();
                const [latestPrice] = result.data;
                setPriceData({ buy: latestPrice.buy, rate: latestPrice.rate });
            } catch (err) {
                console.error(err);
            }
        }
        fetchPrice();
    }, []);

    if (!product || !priceData) return (
        <article className="detail">
            <div className="loading">
                <p>상품정보를 불러오는 중입니다.</p>
            </div>
        </article>
    )

    const goldPrice = priceData.buy;
    const rate = priceData.rate;

    const weightRateMap: Record<number, number> = {
        0.2: 0.054, 0.3: 0.08, 0.5: 0.134, 1: 0.27, 1.875: 0.5, 3.75: 1,
        5: 1.3, 7.5: 2, 10: 2.67, 11.25: 3, 18.75: 5, 37.5: 10,
        45: 12, 50: 13.33, 75: 20, 100: 26.67, 112.5: 30, 187.5: 50, 375: 100, 500: 133.33, 1000: 266.67
    }

    const getCalculatedPrice = (weight: number)=>
            Math.round((goldPrice * (weightRateMap[weight] ?? 1) * rate));

    const price = getCalculatedPrice(product.weight);

    const roundedPrice = price !== undefined
        ? Math.ceil(price / 1000) * 1000
        : undefined;

    const weightPlusMap: Record<number, number> = {
        0.2: 30000, 0.3: 30000, 0.5: 30000,
        1: 40000, 1.875: 40000, 3.75: 40000,
        5: 30000, 7.5: 30000, 10: 20000, 11.25: 10000,
        18.75: 10000
    }

    const displayPrice = (weight: number) =>{
        console.log(weight, roundedPrice, weightPlusMap[weight])
         return roundedPrice && roundedPrice + (weightPlusMap[weight] ?? 0);
        }

    const isPriceHidden = pathname.startsWith('/silverbar');

    // 순금베이비, 순금코인, 순금 기념품, 실버바
    const detailImage = pathname.startsWith('/%EC%88%9C%EA%B8%88%EB%B2%A0%EC%9D%B4%EB%B9%84') ||
        pathname.startsWith('/%EC%88%9C%EA%B8%88%EC%BD%94%EC%9D%B8/detail/53') ||
        pathname.startsWith('/%EC%88%9C%EA%B8%88%EA%B8%B0%EB%85%90%ED%92%88')
        ? "/images/detail/detail_02_2.png"
        : pathname.startsWith('/%EC%8B%A4%EB%B2%84%EB%B0%94')
            ? null
            : "/images/detail/detail_02.jpg";

    return (<article className="detail">
        <div>
            <div className="display-flex">
                <div>
                    <Image src={product.img} alt="상품이미지" width={550} height={550} />
                </div>
                <div>
                    <h2>{product.name} {product.name === "골드바 수납함" ? "" : `${product.weight}g`}</h2>
                    {product.detailContent ? <p>{product.detailContent}</p> : <p> </p>}
                    <div>
                        <p>판매가</p>
                        <h3>
                            {product.name === "골드바 수납함" ? (
                                <span>30,000원</span>
                            ) : isPriceHidden || product.category === "실버바" ? (
                                <span>시세 변동</span>
                            ) : (
                                <span>{displayPrice(product.weight)?.toLocaleString()}원</span>
                            )}
                        </h3>
                        <ul>
                            {product.subname === "" &&
                                <li className="display-flex">
                                    <p>상품요약정보</p>
                                    <p>{product.subname}</p>
                                </li>
                            }
                            {product.model &&
                                <li className="display-flex">
                                    <p>모델</p>
                                    <p>{product.model}</p>
                                </li>}
                            <li className="display-flex">
                                <p>제조사</p>
                                <p>(주) 한국금시장거래소</p>
                            </li>
                            <li className="display-flex">
                                <p>브랜드</p>
                                <p>(주) 한국금시장거래소</p>
                            </li>
                        </ul>
                        <p>(최소주문수량 1개 이상)</p>
                    </div>
                    <button type="button">
                        <TellButton>문의하기</TellButton>
                    </button>
                </div>
            </div>
            <div>
                <h2>상세정보</h2>
                <div>
                    <Image src="/images/detail/detail_01.jpg" alt="주의사항" width={1000} height={460} />
                    {product.detailImag && <Image src={product.detailImag} alt="상세정보" width={1000} height={5000} />}
                    {detailImage && <Image src={detailImage} alt="상세정보" width={1000} height={2700} />}
                    <Image src="/images/detail/detail_03.jpeg" alt="상세정보" width={1000} height={1800} />
                    <Image src="/images/detail/detail_04.png" alt="상세정보" width={1000} height={800} />
                    <Image src="/images/detail/detail_05.jpg" alt="상세정보" width={1000} height={2000} />
                    <Image src="/images/detail/detail_06.jpg" alt="상세정보" width={1000} height={3000} />
                    <Image src="/images/detail/detail_07.jpg" alt="구매 전 유의사항" width={1000} height={1700} />
                </div>
            </div>
        </div>
    </article>
    )
}