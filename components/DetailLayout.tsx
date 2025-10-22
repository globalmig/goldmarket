'use client'
import { ProductData } from "@/data/productData";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import TellButton from "./TellButton";
import { displayPrice, getCalculatedPrice } from "@/util/calculatedPrice";
import { useEffect, useState } from "react";
import usePrice from "@/hook/usePrice";

interface DetailPriceProps {
  buy: number,
  sell: number,
  rate: number,
  prevBuyPrice: number,
  prevSellPrice: number,
  date: string,
}

export default function DetailLayout() {

    const params = useParams();
    const pathname = usePathname();
    const { id } = params;
    const productId = Number(id);
    const product = ProductData.find(p => p.id === productId);

    const [goldPrice, setGoldPrice] = useState<DetailPriceProps | null>(null);
    const detailPrice = usePrice();

    useEffect(()=> {
    if(detailPrice) setGoldPrice(detailPrice);
  },[detailPrice]);

    if (!product || !goldPrice) return (
        <article className="detail">
            <div className="loading">
                <p>상품정보를 불러오는 중입니다.</p>
            </div>
        </article>
    )

    const gold = goldPrice?.buy ?? 0;
    const rate = goldPrice?.rate ?? 1;
    const price = getCalculatedPrice(gold, product.weight, rate);
    const currentPrice = displayPrice(price, product.weight)?.toLocaleString();

    const isPriceHidden = pathname.startsWith('/silverbar') || product.name === "LS MnM 골드바";

    const detailImage = pathname.startsWith('/goldbaby') ||
        pathname.startsWith('/goldcoin') ||
        pathname.startsWith('/goldgift')
        ? "/images/detail/detail_02_2.png"
        : pathname.startsWith('/silverbar')
            ? null
            : "/images/detail/detail_02.jpg";

    return (<article className="detail">
        <div>
            <div className="display-flex">
                <div>
                    <Image src={product.img} alt={product.name} width={550} height={550} priority />
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
                                <span>{currentPrice}원</span>
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