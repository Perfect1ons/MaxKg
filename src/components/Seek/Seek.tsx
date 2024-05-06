"use client";
import React, { useState, useEffect } from "react";
import { ISeekCatalog, ISeekItem } from "@/types/Search/seek";
import dynamic from "next/dynamic";
import Image from "next/image";
import ProductList from "./ProductList";
import CustomSelect from "./CustomSelect";

const SeekCards = dynamic(() => import("@/components/Seek/SeekCard"));

interface SeekProps {
  catalog: ISeekCatalog[];
  product: ISeekItem[];
}

const Seek: React.FC<SeekProps> = ({ catalog, product }) => {
  const [items, setItems] = useState<ISeekItem[]>(product);
  const [sortOrder, setSortOrder] = useState<
    "default" | "cheap" | "expensive" | "rating" | null
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
      setSortOrder(sortParam as "cheap" | "expensive" | "rating");
    } else {
      setSortOrder("default");
    }
  }, []);

  useEffect(() => {
    if (sortOrder !== null && sortOrder !== "default") {
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

const handleSort = (order: "default" | "cheap" | "expensive" | "rating") => {
  if (order === "default") {
    setSortOrder(null); // Сброс порядка сортировки
    setItems(product); // Возвращение изначальных данных
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.delete("sort"); // Удаление параметра sort из URL
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${queryParams.toString()}`
    );
  } else {
    setSortOrder(order);
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("sort", order);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${queryParams.toString()}`
    );
  }
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
          <CustomSelect
            value={sortOrder || "default"}
            options={[
              { label: "По умолчанию", value: "default" },
              { label: "Сначала дешевле", value: "cheap" },
              { label: "Сначала дороже", value: "expensive" },
              { label: "По рейтингу", value: "rating" },
            ]}
            onChange={(value) => handleSort(value)}
          />
        </div>
      </div>
      <ProductList items={items} />
    </section>
  );
};

export default Seek;
