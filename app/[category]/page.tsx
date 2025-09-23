import ProductLayout from "@/components/ProductLayout";
import { CATEGORY_MAP } from "@/data/categoryMap";
import { ProductData } from "@/data/productData";

interface categoryPageProps {
  params: Promise<{category: string; subCategory: string}>;
}

export const revalidate = 10800;

export default async function ProductPage({ params }: categoryPageProps) {

  const category = (await params).category;
  const currentCategory = CATEGORY_MAP[category];
  
  // 카테고리 분류 (상위)
  const filterList = ProductData
          .filter(product => product.category === category);
  
  const uniqueList = Array.from(
          new Map(filterList.map(p => [`${p.name}-${p.weight}`, p])).values()
  );

    return (
       <ProductLayout categoryKey={category} currentCategory={currentCategory}  productList={uniqueList}/>
    )
}