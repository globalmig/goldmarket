import { MetadataRoute } from "next";
import { ProductData } from "@/data/productData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.goldmarket.co.kr";
  const fixedDate ="2025-09-17"

  const categories = [...new Set(ProductData.map((p) => p.category))];
  const subCategories = [
    ...new Set(ProductData.map((p) => `${p.category}/${p.subCategory}`)),
  ];
  const products = ProductData.map((p) => ({
    id: p.id, category: p.category,
  }));

  const urls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: fixedDate,
      priority: 1.0,
    },
    ...categories.map((cat) => ({
      url: `${baseUrl}/${cat}`,
      lastModified: fixedDate,
      priority: 0.8,
    })),
    ...subCategories.map((sub) => ({
      url: `${baseUrl}/${encodeURIComponent(sub)}`,
      lastModified: fixedDate,
      priority: 0.7,
    })),
    ...products.map((p) => ({
      url: `${baseUrl}/${p.category}/detail/${p.id}`,
      lastModified: fixedDate,
      priority: 0.6,
    })),
  ];

  return urls;
}
