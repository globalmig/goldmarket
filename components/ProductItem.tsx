'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProductItemProps {
    id: number,
    category: string,
    name: string,
    subname: string,
    price: number | undefined,
    img: string,
    weight: number,
    priority?: boolean;
}

export default function ProductItem({ id, category, name, subname, price, img, weight, priority = false }: ProductItemProps) {

    const pathname = usePathname();
    const isPriceHidden = pathname.startsWith('/silverbar');

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

    return (
        <section className="product-item">
            <div className="item-wrapper">
                <Link href={`/${category}/detail/${id}`}>
                    <Image src={img} alt={name} fill
                        sizes="(max-width: 768px) 100vw, 24vw" priority={priority} unoptimized />
                </Link>
            </div>
            <div>
                <p>{name} <span>{name !== "골드바 수납함" && `${weight.toLocaleString()}g`}</span></p>
                <p>{subname}</p>
                <p>
                    {name === "골드바 수납함" ? (
                        <span>30,000원</span>
                    ) : isPriceHidden ? (
                        <span>시세 변동</span>
                    ) : (
                        <span>{displayPrice(weight)?.toLocaleString()}원</span>
                    )}
                </p>
            </div>
        </section>
    )
}