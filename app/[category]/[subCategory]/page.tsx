import ProductLayout from "@/components/ProductLayout";

interface subCategoryPageProps {
  params: Promise<{ category: string; subCategory: string }>;
}

export default async function ProductPage({ params }: subCategoryPageProps) {

    const {category, subCategory} = await params;

    return (
        <ProductLayout categoryKey={category} selectedSubCategory={subCategory} />
    )
}