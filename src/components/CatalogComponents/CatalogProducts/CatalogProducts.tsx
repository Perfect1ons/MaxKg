"use client";
import { ICatalogsProducts, Tov } from "@/types/Catalog/catalogProducts";
import { useEffect, useState } from "react";
import { IFiltersBrand } from "@/types/filtersBrand";
import CatalogProductList from "./CatalogProductList";
import Image from "next/image";
import styles from "./style.module.scss";
import Link from "next/link";
import { BackArrow, Cross } from "../../../../public/Icons/Icons"; // Assuming the API function is placed in @/api/catalog
import FiltersProducts from "../FiltersProducts/FiltersProducts";
import { BreadCrumbs } from "@/types/BreadCrums/breadCrums";
import {
  getCatalogProductFilter,
  getProductsByBrand,
  getProductsByCenaMinMax,
  getProductsByDost,
} from "@/api/clientRequest";
import CatalogFiltres, {
  ISelectedFilterProps,
} from "../CatalogFiltres/CatalogFiltres";

interface ICatalogProductsProps {
  catalog: ICatalogsProducts;
  filter: IFiltersBrand;
  breadCrumbs: BreadCrumbs[];
}
export interface IFiltersProps {
  brand: string[];
  price: { max: number; min: number };
  dost: string[];
  additional_filter: any[];
}
type BrandSelection = {
  [key: string]: {
    [key: string]: boolean;
  };
};

export default function CatalogProducts({
  catalog,
  filter,
  breadCrumbs,
}: ICatalogProductsProps) {
  const initialItems = catalog.category.tov || [];
  const [items, setItems] = useState<Tov[]>(initialItems);
  const [selectedBrands, setSelectedBrands] = useState<BrandSelection>({});
  const [selectedFilters, setSelectedFilters] = useState<ISelectedFilterProps>({
    brand: [],
    dost: [],
    additional_filter: [],
  });
  const [sortOrder, setSortOrder] = useState<
    "default" | "cheap" | "expensive" | "rating" | null
  >(null);
  const [isColumnView, setIsColumnView] = useState(false);

  const handleFilterChange = (name: string, value: any) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCatalogProductFilter(
          catalog.category.id,
          selectedFilters
        );
        setItems(response.category.tov || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedFilters]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder]);

  const sortItems = (order: "cheap" | "expensive" | "rating") => {
    const sortedItems = [...items]; // Use current items for sorting
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
    setSortOrder(order);
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("sort", order);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${queryParams.toString()}`
    );
  };

  const handleViewChange = (isColumn: boolean) => {
    setIsColumnView(isColumn);
  };

  return (
    <section className="seek">
      <div className="all__directions container">
        {breadCrumbs.slice(-2, -1).map((crumbs) => (
          <Link
            className="all__directions_link"
            href={`/catalog/${crumbs.full_slug}`}
            key={crumbs.id}
          >
            <BackArrow /> Назад
          </Link>
        ))}
        {breadCrumbs.map((crumbs) => {
          return (
            <Link
              className="all__directions_link"
              href={`/catalog/${crumbs.full_slug}`}
              key={crumbs.id}
            >
              {crumbs.name}
            </Link>
          );
        })}
      </div>
      <div className="container"></div>
      <div className="container">
        <div className="sort__buttons">
          <CatalogFiltres
            handleFilterChange={handleFilterChange}
            selectedFilters={selectedFilters}
            onChange={(value) => handleSort(value)}
            filter={filter}
            catalog={catalog}
            value={sortOrder || "default"}
            options={[
              { label: "По умолчанию", value: "default" },
              { label: "Сначала дешевле", value: "cheap" },
              { label: "Сначала дороже", value: "expensive" },
              { label: "По рейтингу", value: "rating" },
            ]}
          />
          {/* <FiltersProducts
            addFilter={addFilter}
            addDay={addDay}
            addBrand={addBrand}
            filter={filter}
            value={sortOrder || "default"}
            options={[
              { label: "По умолчанию", value: "default" },
              { label: "Сначала дешевле", value: "cheap" },
              { label: "Сначала дороже", value: "expensive" },
              { label: "По рейтингу", value: "rating" },
            ]}
            onChange={(value) => handleSort(value)}
            onBrandToggle={toggleBrandSelection}
            selectedBrands={selectedBrands}
            onReset={resetSelection}
            resetSelectionAll={resetSelectionAll}
            fetchProductsByMinMax={fetchProductsByMinMax}
          /> */}
          <div className="default__sort_style">
            <button
              className="default__sort_icons"
              onClick={() => handleViewChange(false)}
            >
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className={`default__sort_icon ${
                    !isColumnView ? "sort__button_icons_active" : ""
                  }`}
                ></div>
              ))}
            </button>

            <button
              className="default__sort_icons_column"
              onClick={() => handleViewChange(true)}
            >
              {[...Array(2)].map((_, index) => (
                <div
                  key={index}
                  className={`default__sort_icon_column ${
                    isColumnView ? "sort__button_icons_active" : ""
                  }`}
                ></div>
              ))}
            </button>
          </div>
        </div>
      </div>
      {/* <ul className={styles.choiseList}>
        {Object.entries(selectedBrands).map(([mainKey, subKeys]) =>
          Object.entries(subKeys).map(
            ([subKey, isSelected]) =>
              isSelected && (
                <li
                  key={`${mainKey}-${subKey}`}
                  className={styles.choiseList__li}
                >
                  {subKey}
                  <span
                    className={styles.choiseList__li__button}
                    onClick={() => toggleBrandSelection(mainKey, subKey)}
                  >
                    <Cross />
                  </span>
                </li>
              )
          )
        )}
        {Object.keys(selectedBrands).length > 0 && (
          <button onClick={resetSelectionAll} className={styles.clearAllButton}>
            Очистить все
          </button>
        )}
      </ul> */}
      {/* Проверяем, есть ли товары в каталоге */}
      {items && items.length === 0 ? (
        <div className={styles.containerUndefined}>
          <Image src="/img/undefinedPage.png" alt="" width={180} height={180} />
          <p className={styles.containerUndefined__parap}>
            В этой категории нет товаров продавай на max kg
          </p>
        </div>
      ) : (
        <CatalogProductList items={items} isColumnView={isColumnView} />
      )}
    </section>
  );
}
