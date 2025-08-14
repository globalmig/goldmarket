import ProductLayout from "@/components/ProductLayout";

interface categoryPageProps {
  params: Promise<{category: string;}>;
}

export default async function ProductPage({ params }: categoryPageProps) {

  const {category} = await params;

    return (
       <ProductLayout categoryKey={category} />
    )
}