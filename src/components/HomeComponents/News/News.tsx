"use client"
import { INews } from '@/types/news'
import styles from './style.module.scss'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import cn from 'clsx';

export interface INew {
    news: INews[]
}

const News = ({news}: INew ) => {
      const [itemsToShow, setItemsToShow] = useState<number>(6);
      const totalItems = news.length;
      const router = useRouter();

      const handleLoadMore = () => {
        setItemsToShow((prevItems) => prevItems + 6);
      };

      const handleHide = () => {
        setItemsToShow(6);
      };

      const handleShowAll = () => {
        router.push("/all-news");
      };

  return (
    <section className="news">
      <div className="container">
        <h1 className="sections__title">Новости</h1>
        <div className={styles.news__container}>
          {news.slice(0, itemsToShow).map((item) => (
            <div className={styles.promotion__card} key={item.naim}>
              <Image
                onClick={() => router.push(`https://max.kg/promo/${item.id}`)}
                className={styles.promotion__card_img}
                src={`https://max.kg/${item.logo}`}
                width={400}
                height={250}
                alt={item.naim}
              />
            </div>
          ))}
        </div>
        <div className={styles.news__buttons}>
          <div className="showMore">
            {itemsToShow < totalItems && (
              <button
                className={styles.news__buttons_showMore}
                onClick={handleLoadMore}
              >
                Показать ещё
              </button>
            )}
          </div>
          <div className="hideMore">
            {itemsToShow >= totalItems && itemsToShow > 6 && (
              <button
                className={styles.news__buttons_showMore}
                onClick={handleHide}
              >
                Скрыть все
              </button>
            )}
          </div>
          <button
            className={cn(styles.news__buttons_showMore, "showAll_button")}
            onClick={handleShowAll}
          >
            Показать все
          </button>
        </div>
      </div>
    </section>
  );
}

export default News