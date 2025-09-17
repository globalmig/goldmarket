'use client'
import { usePathname } from "next/navigation";
import ProductList from "./ProductList";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CATEGORY_MAP } from "@/data/categoryMap";

interface ProductLayoutProps {
    categoryKey: string;
    selectedSubCategory?: string;
}

export default function ProductLayout({ categoryKey, selectedSubCategory }: ProductLayoutProps) {

    const data = CATEGORY_MAP[categoryKey];
    const pathname = usePathname();
    const [priceData, setPriceData] = useState(null);
    
    useEffect(()=> {
        const fetchPrice = async () => {
      try {
        const res = await fetch("/api/price");
        const result = await res.json();
        const [latestPrice] = result.data;
        setPriceData(latestPrice);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPrice();
    },[]);

    return (
        <article className="product">
            <div>
                <div>
                    <h2>{data?.title ?? " "}</h2>
                    {data?.subcategories &&
                     (!pathname.startsWith('/goldcoin') || !pathname.startsWith("/silverbar") ?
                        <ul className="display-flex subcategory">
                            {data?.subcategories?.map((sub, index) => {
                                const encodedSub = encodeURIComponent(sub);
                                const decodedPath = decodeURIComponent(pathname);
                                return (
                                    <li key={index}>
                                        <Link href={`/${categoryKey}/${encodedSub}`}
                                            style={
                                                decodedPath === `/${categoryKey}/${sub}`
                                                    ? { background: "black", color: "white" }
                                                    : { background: "#f3f3f3", color: "black" }
                                            }>
                                            {sub}
                                        </Link>
                                    </li>
                                )
                            }
                            )}
                        </ul> : <></>)
                    }
                </div>
                {(!priceData || !data)
                ?
                <div className="loading">
                    <p>상품을 불러오는 중입니다.</p>
                </div>
                :
                <ProductList category={data.title} CATEGORY_MAP={CATEGORY_MAP}
                    subCategory={selectedSubCategory
                        ? [decodeURIComponent(selectedSubCategory)]
                        : undefined
                    } priceData={priceData}/>
                }
            </div>
        </article>
    )
}