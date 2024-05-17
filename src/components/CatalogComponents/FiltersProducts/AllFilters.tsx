"use client";
import { useEffect, useState } from "react";
import cn from "clsx";
import styles from "./style.module.scss";
import { IFiltersBrand, N11 } from "@/types/filtersBrand";
import { checkIcon, chevronDownIcon } from "../../../../public/Icons/Icons";
import { it } from "node:test";

interface IProps {
  filter: IFiltersBrand;
  close: () => void;
  options: {
    label: string;
    value: "default" | "cheap" | "expensive" | "rating";
  }[];
  value: string;
  onChange: (value: "default" | "cheap" | "expensive" | "rating") => void;
}
const AllFilters = ({ filter, close, onChange, options, value }: IProps) => {
  const [brandIsShow, setBrandIsShow] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [selectedBrands, setSelectedBrands] = useState<{
    [key: string]: boolean;
  }>({});
  const [showAllButtonClicked, setShowAllButtonClicked] = useState<{
    [key: string]: boolean;
  }>({});
  const [isOpenState, setIsOpenState] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleFilters = (typeName: string) => {
    setIsOpenState((prevState) => ({
      ...prevState,
      [typeName]: !prevState[typeName],
    }));
  };

  const handleShowAllBrands = (type: string) => {
    setBrandIsShow((prev) => ({
      ...prev,
      [type]: true,
    }));
    setShowAllButtonClicked((prev) => ({
      ...prev,
      [type]: true,
    }));
  };

  const handleBrandSelect = (brandName: string) => {
    setSelectedBrands((prevSelected) => ({
      ...prevSelected,
      [brandName]: !prevSelected[brandName],
    }));
  };

  // Определяем массив всех фильтров
  const allFilters =
    filter && filter.filter ? Object.values(filter.filter) : [];

  // Определяем количество частей
  const numberOfChunks = 2;

  // Разбиваем массив фильтров на части
  const chunkSize = Math.ceil(allFilters.length / numberOfChunks);
  const filterChunks = Array.from({ length: numberOfChunks }, (_, index) =>
    allFilters.slice(index * chunkSize, (index + 1) * chunkSize)
  );

  return (
    <div className={styles.containerAllFilters}>
      <div className={styles.backDropdiv} onClick={close}></div>
      <div className={styles.sidebarContainer}>
        <h1 className={styles.sidebarContainer__h1}>Все фильтры</h1>
        <div className={styles.buttonsContainerReset}>
          <button
            className={cn(
              styles.buttonsContainerReset__button,
              styles.buttonsContainerReset__buttonDiscard
            )}
          >
            Сбросить
          </button>
          <button
            className={cn(
              styles.buttonsContainerReset__button,
              styles.buttonsContainerReset__buttonApply
            )}
          >
            Применить фильтры
          </button>
        </div>
      </div>
      <div className={styles.divAll}>
        {[...Array(1)].map((_, divIndex) => (
          <div key={divIndex} className={styles.wrapContainer}>
            <ul className={styles.divAll__divUls}>
              <li className={styles.divAll__divUlsLi}>
                <button
                  onClick={() => toggleFilters("default")}
                  // onClick={() => toggleFilters(item.type_name)}
                  className={styles.buttonBrand}
                >
                  <li className={styles.showFiltersUlContainer__li}>
                    {/* Сортировка */}
                    {options.find((option) => option.value === value)?.label ||
                      "По умолчанию"}
                  </li>
                  <span
                    className={cn(
                      styles.footerNavItemArrowIsActive
                      // isOpenState.default && styles.footerNavItemArrow
                    )}
                  >
                    {chevronDownIcon()}
                  </span>
                </button>
                <ul
                  className={cn(styles.showFiltersUl, {
                    [styles.showFiltersActive]: isOpenState.default,
                  })}
                >
                  <div className={styles.showFiltersUl__div}>
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className={cn(styles.option, {
                          [styles.selected]: value === option.value,
                        })}
                        // className={`option ${value === option.value ? "selected" : ""}`}
                        onClick={() => {
                          onChange(option.value);
                        }}
                      >
                        <span className={styles.option__cyrcle}></span>
                        {/* <span className="option__cyrcle"></span> */}
                        {option.label}
                      </div>
                    ))}
                  </div>
                </ul>
              </li>
            </ul>
            <ul className={styles.divAll__divUls}>
              <li className={styles.divAll__divUlsLi}>
                <button
                  onClick={() => toggleFilters("delivery")}
                  // onClick={() => toggleFilters(item.type_name)}
                  //   onClick={() => setFiltersIsShow(!filtersIsShow)}
                  className={styles.buttonBrand}
                >
                  Сроки доставки
                  <span
                    className={cn(
                      styles.footerNavItemArrowIsActive
                      // filtersIsShow.delivery && styles.footerNavItemArrow
                    )}
                  >
                    {chevronDownIcon()}
                  </span>
                </button>
                <ul
                  className={cn(styles.showFiltersUl, {
                    [styles.showFiltersActive]: isOpenState.delivery,
                  })}
                >
                  <div className={styles.showFiltersUl__div}>
                    {/* Если брендов нет, выводим сообщение */}
                    {filter.variant_day.length === 0 && (
                      <p>Нет доступных дней</p>
                    )}
                    {filter.variant_day.map((item, index) => {
                      if (!brandIsShow && index >= 7) {
                        return null;
                      }
                      return (
                        <ul
                          key={item}
                          className={styles.showFiltersUlContainer}
                          // onClick={() => toggleBrand(item)}
                        >
                          <span
                            className={cn(
                              styles.showFiltersUlContainer__check,
                              {
                                [styles.showFiltersUlContainer__checkActive]:
                                  selectedBrands[item],
                              }
                            )}
                          >
                            {selectedBrands[item] && checkIcon()}
                          </span>
                          <li className={styles.showFiltersUlContainer__li}>
                            {item === "1"
                              ? `${item} день`
                              : item === "1-2"
                              ? `${item} дня`
                              : item === "10-20" ||
                                (parseInt(item) >= 10 && parseInt(item) <= 20)
                              ? `${item} дней`
                              : `${item} дней`}
                          </li>

                          {/* <li className={styles.showFiltersUlContainer__li}>{item}</li> */}
                        </ul>
                      );
                    })}
                  </div>
                  {/* {!brandIsShow && filter.variant_day.length > 7 && (
                <button
                  onClick={handleShowAllBrands}
                  className={styles.buttonShowBrand}
                >
                  Показать все
                </button>
              )}
              <button
                disabled={!anyBrandSelected}
                className={cn(styles.buttonsContainer__button, {
                  [styles.buttonsContainer__buttonDisabled]: !anyBrandSelected,
                })}
                onClick={handleReset}
              >
                Сбросить
              </button> */}
                </ul>
              </li>
            </ul>
            <ul className={styles.divAll__divUls}>
              <li className={styles.divAll__divUlsLi}>
                <button
                  onClick={() => toggleFilters("brand")}
                  //   onClick={() => setFiltersIsShow(!filtersIsShow)}
                  className={styles.buttonBrand}
                >
                  Бренд
                  <span
                    className={cn(
                      styles.footerNavItemArrowIsActive
                      // filtersIsShow.brand && styles.footerNavItemArrow
                    )}
                  >
                    {chevronDownIcon()}
                  </span>
                </button>
                <ul
                  className={cn(styles.showFiltersUl, {
                    [styles.showFiltersActive]: isOpenState.brand,
                  })}
                >
                  <div className={styles.showFiltersUl__div}>
                    {/* Если брендов нет, выводим сообщение */}
                    {filter.brand.length === 0 && <p>Нет доступных брендов</p>}
                    {filter.brand.map((item, index) => {
                      if (!brandIsShow && index >= 7) {
                        return null;
                      }
                      return (
                        <ul
                          key={item}
                          className={styles.showFiltersUlContainer}
                          // onClick={() => toggleBrand(item)}
                        >
                          <span
                            className={cn(
                              styles.showFiltersUlContainer__check,
                              {
                                [styles.showFiltersUlContainer__checkActive]:
                                  selectedBrands[item],
                              }
                            )}
                          >
                            {selectedBrands[item] && checkIcon()}
                          </span>
                          <li className={styles.showFiltersUlContainer__li}>
                            {item}
                          </li>
                        </ul>
                      );
                    })}
                  </div>
                  {!brandIsShow && filter.brand.length > 7 && (
                    <button
                      // onClick={handleShowAllBrands}
                      className={styles.buttonShowBrand}
                    >
                      Показать все
                    </button>
                  )}
                  {/* <button
                    disabled={!anyBrandSelected}
                    className={cn(styles.buttonsContainer__button, {
                      [styles.buttonsContainer__buttonDisabled]:
                        !anyBrandSelected,
                    })}
                    onClick={handleReset}
                  >
                    Сбросить
                  </button> */}
                </ul>
              </li>
            </ul>
            <ul className={styles.divAll__divUls}>
              <li className={styles.divAll__divUlsLi}>
                <button
                  className={styles.buttonBrand}
                  onClick={() => toggleFilters("price")}
                  //   onClick={() => setFiltersIsShow(!filtersIsShow)}
                >
                  Цена
                  <span
                    className={cn(
                      styles.footerNavItemArrowIsActive
                      // filtersIsShow.price && styles.footerNavItemArrow
                    )}
                  >
                    {chevronDownIcon()}
                  </span>
                </button>
                <ul
                  className={cn({
                    [styles.divAll__divUl]: isOpenState.price,
                  })}
                >
                  <div className={styles.showFiltersUlContainer}>
                    <input
                      type="number"
                      className={styles.inputPrice}
                      placeholder="От 0"
                    />
                    <input
                      type="number"
                      className={styles.inputPrice}
                      placeholder="До 0"
                    />
                  </div>
                  <div className={styles.buttonsContainer}>
                    <button className={styles.buttonsContainer__button}>
                      Готово
                    </button>
                  </div>
                </ul>
              </li>
            </ul>
          </div>
        ))}
        {[...Array(2)].map((_, divIndex) => (
          <div key={divIndex} className={styles.wrapContainer}>
            {/* Проверяем, есть ли фильтры для текущего дива */}
            {filterChunks[divIndex] && filterChunks[divIndex].length > 0 && (
              <ul className={styles.divAll__divUls}>
                {/* Проходимся по каждому фильтру в текущей части */}
                {filterChunks[divIndex].map((item: N11) => (
                  <li key={item.id_type} className={styles.divAll__divUlsLi}>
                    <button
                      onClick={() => toggleFilters(item.type_name)}
                      className={styles.buttonBrandsAll}
                    >
                      {item.type_name}

                      <span
                        className={cn(
                          styles.footerNavItemArrowIsActive,
                          isOpenState[item.type_name] &&
                            styles.footerNavItemArrow
                        )}
                      >
                        {chevronDownIcon()}
                      </span>
                    </button>
                    {/* Проверяем, открыт ли текущий фильтр, и показываем его ul */}
                    {isOpenState[item.type_name] && (
                      <ul className={styles.divAll__divUl}>
                        {/* Проходимся по каждому подфильтру в текущем фильтре */}
                        {Object.values(item.filter).map(
                          (subItem: any, subIndex) =>
                            // Проверяем, была ли нажата кнопка "Показать все" для текущего типа фильтров
                            (showAllButtonClicked[item.type_name] ||
                              subIndex < 6) && (
                              <li
                                key={subItem.id_filter}
                                className={styles.showFiltersUlContainer}
                              >
                                <span
                                  className={cn(
                                    styles.showFiltersUlContainer__check,
                                    {
                                      [styles.showFiltersUlContainer__checkActive]:
                                        selectedBrands[subItem.name],
                                    }
                                  )}
                                  onClick={() =>
                                    handleBrandSelect(subItem.name)
                                  }
                                >
                                  {selectedBrands[subItem.name] && checkIcon()}
                                </span>
                                <span
                                  className={styles.showFiltersUlContainer__li}
                                >
                                  {subItem.name} ({subItem.kol})
                                </span>
                              </li>
                            )
                        )}
                        {/* Показываем кнопку "Показать все" только если фильтров больше 6 и кнопка еще не была нажата */}
                        {Object.values(item.filter).length > 6 &&
                          !showAllButtonClicked[item.type_name] && (
                            <li className={styles.showFiltersUlContainer}>
                              <button
                                onClick={() =>
                                  handleShowAllBrands(item.type_name)
                                }
                                className={styles.buttonShowBrand}
                              >
                                Показать все
                              </button>
                            </li>
                          )}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFilters;