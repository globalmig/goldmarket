"use client"
import { ProductData } from "@/data/productData";
import ProductItem from "./ProductItem";
import { useCallback, useEffect, useState } from "react";

interface ProductListProps {
    category: string,
    subCategory?: string[],
    CATEGORY_MAP: {
        [key: string]: {
            title: string;
            subcategories?: string[] | undefined;
        };
    },
    priceData: { buy: number, rate: number }
}

export default function ProductList({ category, subCategory, priceData }: ProductListProps) {

    const { buy: goldPrice, rate } = priceData;

    const filterList = ProductData
        .filter(product => product.category === category)
        .filter(product => {
            if (!subCategory || subCategory.length === 0) return true;
            return product.subCategory && subCategory.includes(product.subCategory);
        });

    const uniqueList = Array.from(
        new Map(filterList.map(p => [`${p.name}-${p.weight}`, p])).values()
    );

    const [visibleCount, setVisibleCount] = useState<number>(12);

    const scrollHandle = useCallback(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
            setVisibleCount(prev => Math.min(prev + 12, uniqueList.length));
        }
    }, [uniqueList.length]);

    useEffect(() => {
        window.addEventListener("scroll", scrollHandle);
        return () => window.removeEventListener("scroll", scrollHandle);
    }, [scrollHandle]);

    const weightRateMap: Record<number, number> = {
        0.2: 0.054, 0.3: 0.08, 0.5: 0.134, 1: 0.27, 1.875: 0.5, 3.75: 1,
        5: 1.3, 7.5: 2, 10: 2.67, 11.25: 3, 18.75: 5, 37.5: 10,
        45: 12, 50: 13.33, 75: 20, 100: 26.67, 112.5: 30, 187.5: 50, 375: 100, 500: 133.33, 1000: 266.67
    }

    const getCalculatedPrice = (weight: number) =>
        Math.round((goldPrice * (weightRateMap[weight] ?? 1) * rate));

    return (
        <div className={`product-list ${uniqueList.length > 0 ? "isList" : "unList"}`}>
            {uniqueList.length > 0 ?
                (
                    [...uniqueList]
                        .sort((a, b) => {
                            if (a.category === "순금베이비") {
                                return (a.weight ?? 0) - (b.weight ?? 0);
                            } else if (a.name === b.name) {
                                if (a.subCategory === "기타 골드바") {
                                    return (b.weight ?? 0) - (a.weight ?? 0);
                                } else {
                                    return (a.weight ?? 0) - (b.weight ?? 0);
                                }
                            }
                            return a.id - b.id;
                        })
                        .slice(0, visibleCount)
                        .map(product => {
                            if (!product) return null;
                            const price = getCalculatedPrice(product.weight);

                            return (
                                <ProductItem
                                    key={product.id}
                                    id={product.id}
                                    category={product.category}
                                    name={product.name ?? ""}
                                    subname={product.subname}
                                    price={price}
                                    img={product.img}
                                    weight={product.weight}
                                />
                            );
                        })
                )
                : (
                    <p>해당 카테고리에 상품이 없습니다.</p>
                )}
        </div>

    )
}
