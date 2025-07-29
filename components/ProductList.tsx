"use client"
import { ProductData } from "@/data/productData";
import ProductItem from "./ProductItem";
import usePrice from "@/hook/usePrice";

interface ProductListProps {
    category: string,
}

interface ProductType {
    id: number;
    category: string;
    name: string;
    subname: string;
    price: number | undefined;
    img: string;
    weight: number;
}


export default function ProductList({ category }: ProductListProps) {

    const updatePrice = usePrice();
    if (!updatePrice) return null;

    const goldPrice = updatePrice?.buy ?? 0;
    const rate = updatePrice?.rate ?? 0;

    const filterList = ProductData.filter(product => {
        return product?.category === category
    });

    const getCalculatedPrice = (product: ProductType) => {
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

    return (
        <div className={`product-list ${filterList.length > 0 ? "isList" : "unList"}`}>
            {filterList.length > 0 ? (
                filterList.map(product => {
                    if (!product) return null;
                    const price = getCalculatedPrice(product);
                   
                    return (
                        <ProductItem
                            key={product.id}
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
