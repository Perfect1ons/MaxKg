"use client";
import styles from "./style.module.scss";
import { IPopularGood } from "@/types/popularGoods";
import PopularGoodsSection from "./PopularGoodsSection/PopularGoodsSection";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface IPopularGoodsProps {
  pageOne: IPopularGood[];
  pageTwo: IPopularGood[];
  pageThree: IPopularGood[];
}

export default function PopularGoods({ pageOne, pageTwo, pageThree }: IPopularGoodsProps) {
  const [page, setPage] = useState(1);
  const router = useRouter();
console.log(pageOne);

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    if (page >= 3) {
      router.push("/all-popular-goods");
    }
  };

  function formatNumber(number : number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

 
  return (
    <div className="goods">
      <div className="container">
        <div className="cardContainer">
          <h2 className="sections__title">Популярные товары</h2>
          <PopularGoodsSection goods={pageOne} />
          {
            page >= 2 && <PopularGoodsSection goods={pageTwo} />
          }
          {
            page >= 3 && <PopularGoodsSection goods={pageThree} />
          }
          <div className={styles.showMoreBtn}>
            <button className="news__buttons_showMore" onClick={handleShowMore}>
              {page < 3 ? "Показать еще" : "Показать все"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
