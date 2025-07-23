'use client'
import Image from "next/image";
import { usePathname } from "next/navigation";

interface ProductItemProps {
    name: string,
    subname: string,
    price?: number,
    img: string,
    weight: number,
    priority?: boolean;
}

export default function ProductItem({ name, subname, price, img, weight, priority = false }: ProductItemProps) {

    const pathname = usePathname();
    const isPriceHidden = pathname.startsWith('/jewelry') || pathname.startsWith('/goldbaby');

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
                    {isPriceHidden ?
                        <span>가격 변동</span>
                        : <span>{price?.toLocaleString()}원</span>
                    }
                </p>
            </div>
        </section>
    )
}