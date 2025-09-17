import { MetadataRoute } from "next";
import { ProductData } from "@/data/productData";
import { CATEGORY_MAP } from "@/data/categoryMap";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.goldmarket.co.kr";
  const fixedDate = "2025-09-17";

  const urls: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: fixedDate, priority: 1.0 },
  ];

  Object.entries(CATEGORY_MAP).forEach(([catKey, catValue]) => {
    urls.push({
      url: `${baseUrl}/${catKey}`,
      lastModified: fixedDate,
      priority: 0.8,
    });

    catValue.subcategories?.forEach((sub) => {
      urls.push({
        url: `${baseUrl}/${catKey}/${encodeURIComponent(sub)}`,
        lastModified: fixedDate,
        priority: 0.7,
      });
    });
  });

  ProductData.forEach((p) => {
    urls.push({
      url: `${baseUrl}/${p.category}/detail/${p.id}`,
      lastModified: fixedDate,
      priority: 0.6,
    });
  });

  return urls;
}
