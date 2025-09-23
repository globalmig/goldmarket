"use client"
import { ProductData } from "@/data/productData";
import ProductItem from "./ProductItem";
import { useCallback, useEffect, useState } from "react";
import { PriceData } from "@/hook/usePrice";
import { getCalculatedPrice } from "@/util/calculatedPrice";

interface ProductListProps {
    category: string;
    subCategory?: string[];
    goldPrice: PriceData | null;
    productList: typeof ProductData;
}

export default function ProductList({ productList, goldPrice }: ProductListProps) {

    const [visibleCount, setVisibleCount] = useState<number>(12);

    const scrollHandle = useCallback(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
            setVisibleCount(prev => Math.min(prev + 12, productList.length));
        }
    }, [productList.length]);

    useEffect(() => {
        window.addEventListener("scroll", scrollHandle);
        return () => window.removeEventListener("scroll", scrollHandle);
    }, [scrollHandle]);

    return (
        <div className={`product-list ${productList.length > 0 ? "isList" : "unList"}`}>
            {productList.length > 0 ?
                (
                    [...productList]
                        .sort((a, b) => {
                            if (a.category === "goldbaby") {
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
                            const gold = goldPrice?.buy ?? 0;
                            const rate = goldPrice?.rate ?? 1;
                            const price = getCalculatedPrice(gold, product.weight, rate);

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
