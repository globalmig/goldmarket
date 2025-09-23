import HomeClient from "@/components/HomeClient"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getLatestGoldPrice } from "@/lib/getLatestGoldPrice";

export const revalidate = 10800;

export default async function Home() {

  const goldPrice = await getLatestGoldPrice()

  return (
    <HomeClient goldPrice={goldPrice}/>
  );
}
