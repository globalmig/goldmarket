'use client'
import { ProductData } from "@/data/productData";
import usePrice from "@/hook/usePrice";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

interface DetailProductType {
    id: number;
    category: string;
    subCategory?: string;
    name: string;
    subname: string;
    model?: string;
    price?: number;
    img: string;
    detailImag?: string;
    weight: number;
}

export default function DetailLayout() {

    const params = useParams();
    const pathname = usePathname();
    const { id } = params;
    const productId = Number(id);
    const product = ProductData.find(p => p.id === productId);
    const productPrice = usePrice();

    if (!product || !productPrice) return <p>상품을 찾을 수 없습니다.</p>

    const goldPrice = productPrice?.buy ?? 0;
    const rate = productPrice?.rate ?? 0;

    const getCalculatedPrice = (product: DetailProductType) => {
        const { weight } = product;

        switch (weight) {
            case 3.75:
                return Math.round(goldPrice * 1 + (rate * goldPrice));
            case 5:
                return Math.round(goldPrice * 1.3 + (rate * goldPrice));
            case 7.5:
                return Math.round(goldPrice * 2 + (rate * goldPrice));
            case 10:
                return Math.round(goldPrice * 2.666666666666667 + (rate * goldPrice));
            case 11.25:
                return Math.round(goldPrice * 3 + (rate * goldPrice));
            case 18.75:
                return Math.round(goldPrice * 5 + (rate * goldPrice));
            case 37.5:
                return Math.round(goldPrice * 10 + (rate * goldPrice));
            case 50:
                return Math.round(goldPrice * 13.33 + (rate * goldPrice));
            case 75:
                return Math.round(goldPrice * 20 + (rate * goldPrice));
            case 100:
                return Math.round(goldPrice * 26.66666666666667 + (rate * goldPrice));
            case 375:
                return Math.round(goldPrice * 100 + (rate * goldPrice));
            case 500:
                return Math.round(goldPrice * 133.333 + (rate * goldPrice));
            case 1000:
                return Math.round(goldPrice * 266.6666666666667 + (rate * goldPrice));
            default:
                return typeof goldPrice === "number" ? goldPrice : undefined;
        }
    };

    const price = getCalculatedPrice(product);
    const roundedPrice = price !== undefined
        ? Math.ceil(price / 1000) * 1000
        : undefined;

    const isPriceHidden = pathname.startsWith('/silverbar');
    const detailImage = pathname.startsWith('/%EC%88%9C%EA%B8%88%EB%B2%A0%EC%9D%B4%EB%B9%84') ||
        pathname.startsWith('/%EC%88%9C%EA%B8%88%EC%BD%94%EC%9D%B8') ||
        pathname.startsWith('/%EC%88%9C%EA%B8%88%EA%B8%B0%EB%85%90%ED%92%88')
        ? "/images/detail/detail_02_2.png"
        : pathname.startsWith('/%EC%8B%A4%EB%B2%84%EB%B0%94')
            ? null
            : "/images/detail/detail_02.jpg";

    return (
        <article className="detail">
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
                                {product.name === "골드바 수납함"
                                ? <span>30,000원</span>
                                : isPriceHidden || product.category === "실버바" ?
                                <span>시세 변동</span>
                                : <span>{roundedPrice?.toLocaleString()}원</span>}
                            </h3>
                            <ul>
                                <li className="display-flex">
                                    <p>상품요약정보</p>
                                    <p>{product.subname}</p>
                                </li>
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
                            <Link href="tel:010-5482-4215">문의하기</Link>
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