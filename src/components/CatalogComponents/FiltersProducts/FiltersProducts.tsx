"use client";
import cn from "clsx";
import { IFiltersBrand } from "@/types/filtersBrand";
import styles from "./style.module.scss";
import React, { useEffect, useState } from "react";
import {
  checkIcon,
  chevronDownIcon,
  filterIcon,
} from "../../../../public/Icons/Icons";
import { useRouter } from "next/navigation";
import Modal from "@/components/UI/ModalHeaders/Modal/Modal";
import AllFilters from "./AllFilters";
interface IProps {
  filter: IFiltersBrand;
  productId: number;
  options: {
    label: string;
    value: "default" | "cheap" | "expensive" | "rating";
  }[];
  value: string;
  onChange: (value: "default" | "cheap" | "expensive" | "rating") => void;
}
type FilterType = "brand" | "price" | "delivery" | "allfilters" | "default";

const FiltersProducts = ({
  filter,
  productId,
  options,
  value,
  onChange,
}: IProps) => {
  const router = useRouter();
  const [brandIsShow, setBrandIsShow] = useState(false);

  const [filtersIsShow, setFiltersIsShow] = useState({
    brand: false,
    price: false,
    delivery: false,
    allfilters: false,
    default: false,
  });
  // useEffect(() => {
  //   const handleBodyClick = (event: MouseEvent) => {
  //     console.log("Body clicked");
  //     const target = event.target as HTMLElement;

  //     const filtersContainer = document.querySelector(".filtersContainer");

  //     if (!filtersContainer) return; // Проверяем, что контейнер фильтров существует

  //     const isClickedInsideFilters = filtersContainer.contains(target);

  //     if (!isClickedInsideFilters) {
  //       setFiltersIsShow({
  //         brand: false,
  //         price: false,
  //         delivery: false,
  //         allfilters: false,
  //         default: false,
  //       });
  //     }
  //   };

  //   document.body.addEventListener("click", handleBodyClick);

  //   return () => {
  //     document.body.removeEventListener("click", handleBodyClick);
  //   };
  // }, []);

  const toggleFilters = (filterType: FilterType) => {
    setFiltersIsShow((prevState) => ({
      ...prevState,
      [filterType]: !prevState[filterType],
    }));

    // Закрываем другие фильтры при открытии текущего
    if (!filtersIsShow[filterType]) {
      setFiltersIsShow((prevState) => ({
        brand: filterType === "brand" ? true : false,
        price: filterType === "price" ? true : false,
        delivery: filterType === "delivery" ? true : false,
        allfilters: filterType === "allfilters" ? true : false,
        default: filterType === "default" ? true : false,
      }));
    }
  };
  const open = () => {
    setFiltersIsShow({ allfilters: false });
  };

  // Создаем состояние для отслеживания состояния выбора для каждого элемента
  const [selectedBrands, setSelectedBrands] = useState<{
    [key: string]: boolean;
  }>({});
  const handleShowAllBrands = () => {
    setBrandIsShow(true);
  };
  // // Функция для обновления состояния выбора для конкретного элемента
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prevState) => ({
      ...prevState,
      [brand]: !prevState[brand],
    }));
  };
  const handleReset = () => {
    setSelectedBrands({}); // Обнуляем selectedBrands при нажатии на кнопку "Сбросить"
  };
  // Проверяем, есть ли хотя бы один выбранный бренд
  const anyBrandSelected = Object.values(selectedBrands).some((value) => value);

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.brandContainer}>
        <button
          onClick={() => toggleFilters("default")}
          className={styles.buttonBrand}
        >
          <li className={styles.showFiltersUlContainer__li}>
            {/* Сортировка */}
            {options.find((option) => option.value === value)?.label ||
              "По умолчанию"}
          </li>
          <span
            className={cn(
              styles.footerNavItemArrowIsActive,
              filtersIsShow.default && styles.footerNavItemArrow
            )}
          >
            {chevronDownIcon()}
          </span>
        </button>
        <ul
          className={cn(styles.showFiltersUl, {
            [styles.showFiltersActive]: filtersIsShow.default,
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
      </div>
      <div className={styles.brandContainer}>
        <button
          onClick={() => toggleFilters("delivery")}
          //   onClick={() => setFiltersIsShow(!filtersIsShow)}
          className={styles.buttonBrand}
        >
          Сроки доставки
          <span
            className={cn(
              styles.footerNavItemArrowIsActive,
              filtersIsShow.delivery && styles.footerNavItemArrow
            )}
          >
            {chevronDownIcon()}
          </span>
        </button>
        <ul
          className={cn(styles.showFiltersUl, {
            [styles.showFiltersActive]: filtersIsShow.delivery,
          })}
        >
          <div className={styles.showFiltersUl__div}>
            {/* Если брендов нет, выводим сообщение */}
            {filter.variant_day.length === 0 && <p>Нет доступных дней</p>}
            {filter.variant_day.map((item, index) => {
              if (!brandIsShow && index >= 7) {
                return null;
              }
              return (
                <ul
                  key={item}
                  className={styles.showFiltersUlContainer}
                  onClick={() => toggleBrand(item)}
                >
                  <span
                    className={cn(styles.showFiltersUlContainer__check, {
                      [styles.showFiltersUlContainer__checkActive]:
                        selectedBrands[item],
                    })}
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
          {!brandIsShow && filter.variant_day.length > 7 && (
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
          </button>
        </ul>
      </div>
      <div className={styles.brandContainer}>
        <button
          className={styles.buttonBrand}
          onClick={() => toggleFilters("price")}
          //   onClick={() => setFiltersIsShow(!filtersIsShow)}
        >
          Цена
          <span
            className={cn(
              styles.footerNavItemArrowIsActive,
              filtersIsShow.price && styles.footerNavItemArrow
            )}
          >
            {chevronDownIcon()}
          </span>
        </button>
        <ul
          className={cn(styles.showFiltersUl, {
            [styles.showFiltersActive]: filtersIsShow.price,
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
            <button className={styles.buttonsContainer__button}>Готово</button>
          </div>
        </ul>
      </div>
      <div className={styles.brandContainer}>
        <button
          onClick={() => toggleFilters("brand")}
          //   onClick={() => setFiltersIsShow(!filtersIsShow)}
          className={styles.buttonBrand}
        >
          Бренд
          <span
            className={cn(
              styles.footerNavItemArrowIsActive,
              filtersIsShow.brand && styles.footerNavItemArrow
            )}
          >
            {chevronDownIcon()}
          </span>
        </button>
        <ul
          className={cn(styles.showFiltersUl, {
            [styles.showFiltersActive]: filtersIsShow.brand,
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
                  onClick={() => toggleBrand(item)}
                >
                  <span
                    className={cn(styles.showFiltersUlContainer__check, {
                      [styles.showFiltersUlContainer__checkActive]:
                        selectedBrands[item],
                    })}
                  >
                    {selectedBrands[item] && checkIcon()}
                  </span>
                  <li className={styles.showFiltersUlContainer__li}>{item}</li>
                </ul>
              );
            })}
          </div>
          {!brandIsShow && filter.brand.length > 7 && (
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
          </button>
        </ul>
      </div>
      <div className={styles.brandContainer}>
        <button
          className={styles.buttonBrand}
          onClick={() => toggleFilters("allfilters")}
        >
          Все фильтры
          <span
            className={cn(
              styles.footerNavItemArrowIsActive
              // filtersIsShow.brand && styles.footerNavItemArrow
            )}
          >
            {filterIcon()}
          </span>
        </button>
      </div>
      <Modal close={open} isVisible={filtersIsShow.allfilters}>
        <AllFilters filter={filter} />
      </Modal>
    </div>
  );
  //   return (
  //     <div className={styles.filtersContainer}>
  //       <div className={styles.brandContainer}>
  //         <button onClick={showFilters} className={styles.buttonBrand}>
  //           Бренд
  //           <span
  //             className={cn(
  //               styles.footerNavItemArrowIsActive,
  //               filtersIsShow && styles.footerNavItemArrow
  //             )}
  //           >
  //             {chevronDownIcon()}
  //           </span>
  //         </button>
  //         <ul
  //           className={cn(styles.showFiltersUl, {
  //             [styles.showFiltersActive]: filtersIsShow,
  //           })}
  //         >
  //           {filter.brand.map((item, index) => {
  //             if (!brandIsShow && index >= 7) {
  //               return null;
  //             }
  //             return (
  //               <div
  //                 key={item}
  //                 className={styles.showFiltersUlContainer}
  //                 // onClick={(showButtonReset)}
  //                 onClick={() => {
  //                   showButtonReset();
  //                   checked();
  //                 }}
  //               >
  //                 <span
  //                   className={cn(styles.showFiltersUlContainer__check, {
  //                     [styles.showFiltersUlContainer__checkActive]: clickCheck,
  //                   })}
  //                   // className={styles.showFiltersUlContainer__check}
  //                 >
  //                   {clickCheck && checkIcon()}
  //                   {/* {checkIcon()} */}
  //                 </span>
  //                 <li className={styles.showFiltersUl__li}>{item}</li>
  //               </div>
  //             );
  //           })}
  //           {!brandIsShow && filter.brand.length > 7 && (
  //             <button onClick={brandShowAll} className={styles.buttonShowBrand}>
  //               Показать все
  //             </button>
  //           )}
  //           {/* Показываем кнопки только если showAll равен true */}
  //           <div className={styles.buttonsContainer}>
  //             <button className={styles.buttonsContainer__button}>Готово</button>
  //           </div>
  //         </ul>
  //       </div>
  //     </div>
  //   );
};

export default FiltersProducts;
