"use client"
import { ProductData } from "@/data/productData";
import ProductItem from "./ProductItem";
import usePrice from "@/hook/usePrice";

interface ProductListProps {
    category: string,
}

export default function ProductList({ category }: ProductListProps) {

    const updatePrice = usePrice();
    if (!updatePrice) return null;

    const filterList = ProductData.filter(product => {
        return product?.category === category
    });

    return (
        <div className={`product-list ${filterList.length > 0 ? "isList" : "unList"}`}>
            {filterList.length > 0 ? (
                filterList.map(product => {
                    if (!product || typeof product.weight !== "number") {
                        return null; // weight는 필수니까 체크
                    }

                    // 가격이 없는 상품은 계산하지 않음
                    if (typeof product.price !== "number") {
                        return (
                            <ProductItem
                                key={product.id}
                                name={product.name ?? ""}
                                subname={product.subname}
                                price={undefined} // 시세 미표시
                                img={product.img}
                                weight={product.weight}
                            />
                        );
                    }

                    if (!updatePrice?.price || updatePrice.price === 0) {
                        return (
                            <ProductItem
                                key={product.id}
                                name={product.name ?? ""}
                                subname={product.subname}
                                price={product.price} // 초기값 유지
                                img={product.img}
                                weight={product.weight}
                            />
                        );
                    }

                    // 무게가 똑같은 상품들 모두 같은 가격으로 출력됨
                    const originalPricePerGram = product.price / product.weight;
                    const currentPricePerGram = updatePrice.price / 3.75;
                    const ratio = currentPricePerGram / originalPricePerGram;
                    const calculatedPrice = Math.round(product.price * ratio);

                    return (
                        <ProductItem
                            key={product.id}
                            name={product.name ?? ""}
                            subname={product.subname}
                            price={calculatedPrice}
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
