"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IBoughtItem, IBoughts } from "@/types/lastBoughts";
import { getBoughts } from "@/api/requests";
import { getBoughtsByClient } from "@/api/clientRequest";
import Card from "@/components/UI/Card/Card";
import CardSkeleton from "@/components/UI/Card/CardSkeleton";

interface IPopularGoodsProps {
  boughts: IBoughtItem[];
}

export default function TodayBoughts({ boughts }: IPopularGoodsProps) {
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [data, setData] = useState<IBoughtItem[]>(boughts);
  const [allDataLoaded, setAllDataLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const perPage = 12;
  const maxPagesToShowMore = 3;
  const router = useRouter();

  const skeletonCards = new Array(12).fill(null);

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

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="goods">
      <div className="container">
        <h1 className="sections__title">Сегодня купили</h1>
      </div>
      <div className="cardContainer">
        <div className="cards">
          {loading
            ? skeletonCards.map((_, index) => (
                <CardSkeleton key={index} loading={loading} />
              ))
            : data
                .slice(0, page * perPage)
                .map((item, index) => <Card cardData={item} key={index} />)}
        </div>

        {loading === false && !showAll && page < maxPagesToShowMore && (
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
