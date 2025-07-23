'use client'
import { usePathname } from "next/navigation";
import ProductList from "./ProductList";

const CATEGORY_MAP: { [key: string]: { title: string } } = {
    goldbar: {
        title: '골드바',
    },
    silverbar: {
        title: '실버바',
    },
    jewelry: {
        title: '순금주얼리',
    },
    goldcoin: {
        title: '순금코인',
    },
    goldbaby: {
        title: '순금베이비',
    },
    goldgift: {
        title: '순금기념품',
    }
};

export default function ProductLayout() {

    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(Boolean);
    const categoryKey = pathSegments[0];
    const data = CATEGORY_MAP[categoryKey];

    return (
        <article className="product">
            <div>
                <div>
                    <h2>{data.title}</h2>
                </div>
                <ProductList category={data.title}/>
            </div>
        </article>
    )
}