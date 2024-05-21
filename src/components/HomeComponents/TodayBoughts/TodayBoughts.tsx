"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TodayBoughtsCards from "./TodayBoughtsCard/TodayBoughtsCard";
import { IBoughtItem, IBoughts } from "@/types/lastBoughts";
import { getBoughts } from "@/api/requests";
import { getBoughtsByClient } from "@/api/clientRequest";

interface IPopularGoodsProps {
  boughts: IBoughtItem[];
}

export default function TodayBoughts({ boughts }: IPopularGoodsProps) {
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [data, setData] = useState<IBoughtItem[]>(boughts);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const perPage = 10;
  const maxPagesToShowMore = 3;
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response: IBoughts = await getBoughtsByClient(2);
      if (response.lastz.length === 0) {
        setAllDataLoaded(true);
      } else {
        setData((prevData) => [...prevData, ...response.lastz]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleShowMore = () => {
    if (!allDataLoaded) {
      const nextPage = page + 1;
      setPage(nextPage);
      if (nextPage >= maxPagesToShowMore) {
        setShowAll(true);
      }
      fetchData();
    }
  };

  return (
    <div className="goods">
      <div className="container">
        <h2 className="sections__title">Сегодня купили</h2>
      </div>
      <div className="cardContainer">
        <div className="main__news_cards">
          {data.slice(0, page * perPage).map((item, index) => (
            <TodayBoughtsCards goods={item} key={index} />
          ))}
        </div>

        {!showAll && page < maxPagesToShowMore && (
          <div className="showMoreBtn">
            <button
              className="default__buttons_showMore"
              onClick={handleShowMore}
            >
              Показать еще
            </button>
          </div>
        )}

        {showAll && (
          <div className="showMoreBtn">
            <button
              className="default__buttons_showMore"
              onClick={() => router.push("/todays")}
            >
              Показать все
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
