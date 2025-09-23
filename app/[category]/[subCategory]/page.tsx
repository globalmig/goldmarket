import ProductLayout from "@/components/ProductLayout";
import { CATEGORY_MAP } from "@/data/categoryMap";
import { ProductData } from "@/data/productData";

interface subCategoryPageProps {
        params: Promise<{ category: string; subCategory: string }>;
}

export const revalidate = 10800;

export default async function ProductPage({ params }: subCategoryPageProps) {

        const category = (await params).category;
        const subCategory = (await params).subCategory;
        const currentCategory = CATEGORY_MAP[category];
        const currentSubCategory = decodeURIComponent(subCategory)

        // 카테고리 분류 (상위/하위)
        const filterList = ProductData
                .filter(product => product.category === category)
                .filter(product => {
                        if (!currentSubCategory || currentSubCategory.length === 0) return true;
                        return product.subCategory && currentSubCategory.includes(product.subCategory);
                });

        const uniqueList = Array.from(
                new Map(filterList.map(p => [`${p.name}-${p.weight}`, p])).values()
        );

        return (
                <ProductLayout categoryKey={category} currentCategory={currentCategory} productList={uniqueList} />
        )
}