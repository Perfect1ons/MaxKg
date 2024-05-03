import { getFooter, getFooterPages } from "@/api/requests";
import FooterPageRenderer from "@/components/UI/FooterPageRenderer/FooterPageRenderer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Как оформить заказ max.kg",
  description:
    "Мы рады приветствовать вас и предложить уникальные возможности для карьерного роста в нашей компании.",
  keywords:
    "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
  robots: "index,follow",
};
export default async function page() {
  const zakaz = await getFooterPages("pomosh/kak-oformit-zakaz");
  const sidebarLinks = await getFooter();

  return (
    <>
      <FooterPageRenderer data={zakaz} links={sidebarLinks} />
    </>
  );
}
