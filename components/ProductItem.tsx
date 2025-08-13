'use client'
import Image from "next/image";
import { usePathname } from "next/navigation";

interface ProductItemProps {
    name: string,
    subname: string,
    price: number | undefined,
    img: string,
    weight: number,
    priority?: boolean;
}

export default function ProductItem({ name, subname, price, img, weight, priority = false }: ProductItemProps) {

    const pathname = usePathname();
    const isPriceHidden = pathname.startsWith('/jewelry') || pathname.startsWith('/goldbaby') || pathname.startsWith('/silverbar');
    const isWeight = weight < 3.75 ; // 무게가 3.75g미만 부터 가격 표시X

    const roundedPrice = price !== undefined
        ? Math.ceil(price / 1000) * 1000
        : undefined;

    return (
        <section className="product-item">
            <div className="item-wrapper">
                <Image src={img} alt={name} fill
                    sizes="(max-width: 768px) 100vw, 24vw" priority={priority} />
            </div>
            <div>
                <p>{name} <span>{weight.toLocaleString()}g</span></p>
                <p>{subname}</p>
                <p>
                    {isPriceHidden || isWeight ?
                        <span>시세 변동</span>
                        : <span>{roundedPrice?.toLocaleString()}원</span>
                    }
                </p>
            </div>
        </section>
    )
}