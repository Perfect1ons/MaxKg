"use client";
import { ISeekCatalog, ISeekItem } from "@/types/Search/seek";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useEffect } from "react";
const SeekCards = dynamic(() => import("@/components/Seek/SeekCard"));

export interface ISeekProps {
  catalog: ISeekCatalog[];
  product: ISeekItem[];
}

const Seek: React.FC<ISeekProps> = ({ catalog, product }) => {
  const [items, setItems] = useState<ISeekItem[]>(product);
  const [sortOrder, setSortOrder] = useState<
    "cheap" | "expensive" | "rating" | null
  >(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sortParam = queryParams.get("sort");
    if (
      sortParam &&
      (sortParam === "cheap" ||
        sortParam === "expensive" ||
        sortParam === "rating")
    ) {
      setSortOrder(sortParam);
    } else {
      setSortOrder(null);
    }
  }, []);

  useEffect(() => {
    if (sortOrder !== null) {
      sortItems(sortOrder);
    }
  }, [sortOrder]);

  const sortItems = (order: "cheap" | "expensive" | "rating") => {
    const sortedItems = [...items];
    switch (order) {
      case "cheap":
        sortedItems.sort((a, b) => a.cenaok - b.cenaok);
        break;
      case "expensive":
        sortedItems.sort((a, b) => b.cenaok - a.cenaok);
        break;
      case "rating":
        sortedItems.sort((a, b) => b.ocenka - a.ocenka);
        break;
      default:
        break;
    }
    setItems(sortedItems);
  };

  const handleSort = (order: "cheap" | "expensive" | "rating") => {
    setSortOrder(order);
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("sort", order);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${queryParams.toString()}`
    );
  };

  return (
    <section className="seek">
      <div className="container">
        <div className="seek__catalog">
          <h1 className="seek__catalog_title">Найдено в категорях</h1>
          <div className="seek__catalog_cards">
            {catalog.map((catalog, index) => {
              const iconSrc = catalog.icon.startsWith("https://")
                ? catalog.icon
                : "https://megabike74.ru/wp-content/themes/chlzuniversal/assets/images/placeholder/placeholder-250x250.jpg";
              return (
                <div key={index} className="seek__catalog_card">
                  <Image
                    className="seek__catalog_card_image"
                    src={iconSrc}
                    width={65}
                    height={65}
                    alt={catalog.name}
                  />
                  <h1 className="seek__catalog_card_title">{catalog.name}</h1>
                </div>
              );
            })}
          </div>
        </div>

        <div className="sort__buttons">
          <h2 className="sort__buttons_title">Сортировать:</h2>
          <button
            className={`sort__buttons_button ${
              sortOrder === "cheap" ? "sort__buttons_button_active" : ""
            }`}
            onClick={() => handleSort("cheap")}
          >
            Сначала дешевле
          </button>
          <button
            className={`sort__buttons_button ${
              sortOrder === "expensive" ? "sort__buttons_button_active" : ""
            }`}
            onClick={() => handleSort("expensive")}
          >
            Сначала дороже
          </button>
          <button
            className={`sort__buttons_button ${
              sortOrder === "rating" ? "sort__buttons_button_active" : ""
            }`}
            onClick={() => handleSort("rating")}
          >
            По рейтингу
          </button>
        </div>
      </div>
      <div className="main__news_cards">
        {items.map((item, index) => (
          <SeekCards key={index} cardData={item} />
        ))}
      </div>
    </section>
  );
};

export default Seek;
