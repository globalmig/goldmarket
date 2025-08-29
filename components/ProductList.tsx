"use client"
import { ProductData } from "@/data/productData";
import ProductItem from "./ProductItem";

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

interface ProductType {
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

    const getCalculatedPrice = (product: ProductType) => {
        const { weight } = product;

        switch (weight) {
            case 0.2:
                return Math.round(goldPrice * 0.054 * rate);
            case 0.3:
                return Math.round(goldPrice * 0.08 * rate);
            case 0.5:
                return Math.round(goldPrice * 0.134 * rate);
            case 1:
                return Math.round(goldPrice * 0.27 * rate);
            case 1.875:
                return Math.round(goldPrice * 0.5 * rate);
            case 3.75:
                return Math.round(goldPrice * 1 * rate);
            case 5:
                return Math.round(goldPrice * 1.3 * rate);
            case 7.5:
                return Math.round(goldPrice * 2 * rate);
            case 10:
                return Math.round(goldPrice * 2.67 * rate);
            case 11.25:
                return Math.round(goldPrice * 3 * rate);
            case 18.75:
                return Math.round(goldPrice * 5 * rate);
            case 37.5:
                return Math.round(goldPrice * 10 * rate);
            case 45:
                return Math.round(goldPrice * 12 * rate);
            case 50:
                return Math.round(goldPrice * 13.33 * rate);
            case 75:
                return Math.round(goldPrice * 20 * rate);
            case 100:
                return Math.round(goldPrice * 26.67 * rate);
            case 112.5:
                return Math.round(goldPrice * 30 * rate);
            case 187.5:
                return Math.round(goldPrice * 50 * rate);
            case 375:
                return Math.round(goldPrice * 100 * rate);
            case 500:
                return Math.round(goldPrice * 133.33 * rate);
            case 1000:
                return Math.round(goldPrice * 266.67 * rate);
            default:
                return typeof goldPrice === "number" ? goldPrice : undefined;
        }
    };

    return (
        <div className={`product-list ${uniqueList.length > 0 ? "isList" : "unList"}`}>
            {uniqueList.length > 0 ? (
                [...uniqueList]
                    .sort((a, b) => {
                        if(a.category === "순금베이비") {
                            return (a.weight ?? 0) - (b.weight ?? 0);
                        } else if (a.name === b.name) {
                            if(a.subCategory === "기타 골드바"){
                            return (b.weight ?? 0) - (a.weight ?? 0);
                        } else {
                            return (a.weight ?? 0) - (b.weight ?? 0);
                        }
                        }
                        return a.id - b.id;
                    })
                    .map(product => {
                        if (!product) return null;
                        const price = getCalculatedPrice(product);

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
            ) : (
                <p>해당 카테고리에 상품이 없습니다.</p>
            )}
        </div>

    )
}
