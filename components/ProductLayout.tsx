'use client'
import { usePathname } from "next/navigation";
import ProductList from "./ProductList";
import Link from "next/link";
import { ProductData } from "@/data/productData";
import usePrice from "@/hook/usePrice";
import { useEffect } from "react"
import { naverConversion } from "@/util/conversion";

interface ProductLayoutProps {
    categoryKey: string;
    selectedSubCategory?: string;
    currentCategory: {
        title: string,
        subcategories?: string[]
    };
    productList: typeof ProductData
}

const CATEGORY_CONVERSION_MAP: Record<string, string> = {
    goldbar: 'custom001',
    goldbaby: 'custom002',
    goldgift: 'custom003',
    goldcoin: 'custom004',
    silverbar: 'custom005',
};
export default function ProductLayout({ categoryKey, selectedSubCategory, currentCategory, productList }: ProductLayoutProps) {

    const pathname = usePathname();
    const goldPrice = usePrice();

    useEffect(() => {
        const conversionType = CATEGORY_CONVERSION_MAP[categoryKey];
        if (!conversionType) return;

        naverConversion(conversionType, 's_2744ddc174ff');
    }, [categoryKey]);

    return (
        <>
            <article className="product">
                <div>
                    <div>
                        <h2>{currentCategory?.title ?? " "}</h2>
                        {currentCategory?.subcategories &&
                            (!pathname.startsWith('/goldcoin') || !pathname.startsWith("/silverbar") ?
                                <ul className="display-flex subcategory">
                                    {currentCategory?.subcategories?.map((sub, index) => {
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
                    {(!productList || !currentCategory || !goldPrice)
                        ?
                        <div className="loading">
                            <p>상품을 불러오는 중입니다.</p>
                        </div>
                        :
                        <ProductList category={currentCategory.title}
                            subCategory={selectedSubCategory
                                ? [decodeURIComponent(selectedSubCategory)]
                                : undefined
                            } goldPrice={goldPrice} productList={productList} />
                    }
                </div>
            </article>
        </>
    )
}