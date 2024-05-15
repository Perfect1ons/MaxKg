"use client";
import { ICatalogMenu, Root2 } from "@/types/Catalog/catalogMenu";
import styles from "./style.module.scss";
import { useState } from "react";
import cn from "clsx";
import { useRouter } from "next/navigation";
import React from "react";
import {
  ChevronRightIconCatalog,
  chevronDownIcon,
  chevronUpIcon,
} from "../../../../public/Icons/Icons";
import Link from "next/link";

interface IProps {
  catalog: ICatalogMenu | null;
  close: () => void;
}

const CatalogMenu = ({ catalog, close }: IProps) => {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(
    2000000464
  );

  const [showMoreCategories, setShowMoreCategories] = useState<{
    [key: number]: boolean;
  }>({});

  // Функция для обработки отображения дополнительных категорий
  const handleShowMore = (categoryId: number) => {
    setShowMoreCategories((prevCategories) => ({
      ...prevCategories,
      [categoryId]: true,
    }));
  };

  // Функция для обработки сворачивания категорий
  const handleCollapse = (categoryId: number) => {
    setShowMoreCategories((prevCategories) => ({
      ...prevCategories,
      [categoryId]: false,
    }));
  };

  // Функция для обработки наведения мыши на категорию
  const handleMouseEnter = (id: number) => {
    setActiveCategoryId(id);
  };

  // для роутинга
  const router = useRouter();
  const handleClick = (path: string) => {
    const fullPath = path.startsWith("/catalog/") ? path : `/catalog/${path}`;
    router.push(fullPath);
    close();
  };

  return (
    <div className={styles.catalogs}>
      <div className={styles.catalogs__3}>
        {catalog &&
          catalog.map((item) => {
            //Отображение главных категорий
            return (
              <div
                key={item.name}
                className={cn(
                  styles.catalogLinkContainer,
                  item.id === activeCategoryId && styles.catalogActive
                )}
              >
                <span className={styles.triangle}></span>
                <Link
                  href={`/catalog/${item.full_slug}`}
                  className={styles.catalogs__h2}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onClick={() => handleClick(item.full_slug)}
                  key={item.name}
                >
                  {item.name}
                  {/* {ChevronRightIconCatalog()} */}
                  <span className={styles.chevronRightIconCatalog}>
                    {ChevronRightIconCatalog()}
                  </span>
                </Link>
              </div>
            );
          })}
      </div>
      <div className={styles.catalogs__9}>
        {catalog &&
          catalog
            .sort((a, b) => a.sort_menu - b.sort_menu)
            .map((item) => (
              <div
                key={item.id}
                className={styles.subMenu}
                style={{
                  display: activeCategoryId === item.id ? "flex" : "none", // Показывать подменю только для активной категории
                }}
              >
                <Link
                  href={`/catalog/${item.full_slug}`}
                  className={styles.catalogs__9h3}
                  onClick={() => handleClick(item.full_slug)}
                >
                  {item.name}
                </Link>
                <ul className={styles.category__ul}>
                  {[...Array(3)].map((_, index) => {
                    const itemsPerDiv = Math.ceil(
                      (item?.child_level2?.length || 0) / 3
                    ); // Определяем количество элементов на каждый div
                    const startSlice = index * itemsPerDiv;
                    const endSlice = (index + 1) * itemsPerDiv;
                    const slicedItems =
                      item?.child_level2?.slice(startSlice, endSlice) || [];
                    return (
                      slicedItems.length > 0 && (
                        <div
                          key={`div-${index}`}
                          className={styles.itemContainer}
                        >
                          {slicedItems.map((childItem) => (
                            <ul
                              key={childItem.id}
                              className={styles.itemConteinerUL}
                            >
                              <Link
                                href={`/catalog/${childItem.full_slug}`}
                                className={styles.category__li__h3}
                                onClick={() => handleClick(childItem.full_slug)}
                              >
                                {childItem.name}
                              </Link>
                              {childItem.child_cat_level3 && (
                                <ul className={styles.itemConteinerUL}>
                                  {showMoreCategories[childItem.id]
                                    ? childItem.child_cat_level3.map(
                                        (subChildItem) => (
                                          <Link
                                            href={`/catalog/${subChildItem.full_slug}`}
                                            key={subChildItem.id}
                                            className={styles.subCatalogsUl__li}
                                            onClick={() =>
                                              handleClick(
                                                subChildItem.full_slug
                                              )
                                            }
                                          >
                                            {subChildItem.name}
                                          </Link>
                                        )
                                      )
                                    : childItem.child_cat_level3
                                        .slice(0, 5)
                                        .map((subChildItem) => (
                                          <Link
                                            href={`/catalog/${subChildItem.full_slug}`}
                                            key={subChildItem.id}
                                            className={styles.subCatalogsUl__li}
                                            onClick={() =>
                                              handleClick(
                                                subChildItem.full_slug
                                              )
                                            }
                                          >
                                            {subChildItem.name}
                                          </Link>
                                        ))}
                                  {childItem.child_cat_level3.length > 5 && (
                                    <button
                                      onClick={() => {
                                        if (showMoreCategories[childItem.id]) {
                                          handleCollapse(childItem.id);
                                        } else {
                                          handleShowMore(childItem.id);
                                        }
                                      }}
                                      className={styles.buttonsCatalogs}
                                    >
                                      {showMoreCategories[childItem.id]
                                        ? "Свернуть"
                                        : `Ещё ${
                                            childItem.child_cat_level3.length -
                                            5
                                          }`}
                                      <span
                                        className={styles.buttonsSpanCatalogs}
                                      >
                                        {showMoreCategories[childItem.id]
                                          ? chevronUpIcon()
                                          : chevronDownIcon()}
                                      </span>
                                    </button>
                                  )}
                                </ul>
                              )}
                            </ul>
                          ))}
                        </div>
                      )
                    );
                  })}
                </ul>
              </div>
            ))}
      </div>
    </div>
  );
};

export default CatalogMenu;