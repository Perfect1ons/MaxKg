"use client";
import { Items } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import Image from "next/image";
import { url } from "@/components/temporary/data";
import { useDispatch } from "react-redux";
import {
  addProductToCart,
  clearCart,
  removeProductFromCart,
} from "@/store/reducers/cart.reducer";
import {
  CopyIcon,
  ShareIcon,
  TgIcon,
  WhIcon,
} from "../../../../public/Icons/Icons";
import cn from "clsx";
import { useState, useEffect } from "react";
import ItemCartModal from "../ItemCartModal/ItemCartModal";
import CartReducerBtn from "@/components/UI/CartReducerBtn/CartReducerBtn";

interface IPriceProps {
  data: Items;
}

const ItemPriceCard = ({ data }: IPriceProps) => {
  const dispatch = useDispatch();

  const [dropdownActive, setDropdownActive] = useState(false);
  const [modal, setModal] = useState(false);

  const [added, setAdded] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (modal) {
      timer = setTimeout(() => {
        setModal(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [modal]);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setDropdownActive(false);
      })
      .catch((err) => {
        console.error("Ошибка при копировании ссылки: ", err);
        setDropdownActive(false);
      });
  };

  const handleWhatsAppClick = () => {
    window.location.href = `https://wa.me/?text=${encodeURIComponent(
      window.location.href
    )}`;
    setDropdownActive(!dropdownActive);
  };

  const handleTelegramClick = () => {
    window.location.href = `https://t.me/share/url?url=${encodeURIComponent(
      window.location.href
    )}`;
    setDropdownActive(!dropdownActive);
  };

  const handleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  const addToCart = () => {
    dispatch(addProductToCart(data));
    setAdded(true);
    setModal(true);
  };

  return (
    <>
      {modal && <ItemCartModal />}
      <div className={styles.ItemPriceCard}>
        <div className={styles.ItemPriceCard__cost}>
          <h2 className={styles.ItemPriceCard__price}>
            {data.cenaok.toLocaleString("ru-RU")}
            <span className={styles.ItemPriceCard__price_custom}>с</span>
          </h2>
          {data.discount_prc > 0 && (
            <span className={styles.ItemPriceCard__price_discount}>
              -{data.discount_prc}%
            </span>
          )}
          {data.discount_prc > 0 && data.old_price > 0 && (
            <h2 className={styles.ItemPriceCard__old_price}>
              {data.old_price.toLocaleString("ru-RU")}
              <span className={styles.ItemPriceCard__old_price_custom}>с</span>
            </h2>
          )}
        </div>
        <div className={styles.ItemPriceCard__ddos}>
          <div className={styles.ItemPriceCard__ddos_info}>
            <Image
              className={styles.product_info__ddos_icon}
              src={`${url}images/delivery_icon.svg`}
              width={20}
              height={20}
              alt="delivery_icon"
              loading="lazy"
            />
            <p className={styles.ItemPriceCard__ddos_title}>
              Наличие и доставка!
            </p>
          </div>
          <p className={styles.ItemPriceCard__ddos_desc}>{data.ddos}</p>
        </div>
        <div className={styles.ItemPriceCard__buttons}>
          {!added && (
            <button
              onClick={addToCart}
              className={styles.ItemPriceCard__buttons_cart}
            >
              В корзину
            </button>
          )}
          {added && <CartReducerBtn data={data} />}
          <button className={styles.ItemPriceCard__buttons_buy}>Купить</button>
        </div>
        <div className={styles.ItemPriceCard__salesman}>
          <h3 className={styles.ItemPriceCard__salesman_title}>
            ИП{" "}
            <span className={styles.ItemPriceCard__salesman_title_custom}>
              Нурдин Улуу Нурболот
            </span>
          </h3>
        </div>
      </div>
      <div className={styles.share}>
        <div className={styles.share_btnControl}>
          <button
            onClick={handleDropdown}
            className={cn(
              styles.share_btnControl_shareBtn,
              dropdownActive && styles.share_btnControl_shareBtn_active
            )}
          >
            <ShareIcon />
          </button>
          <span
            className={cn(
              styles.share_btnControl_info,
              dropdownActive && styles.share_btnControl_info_active
            )}
          >
            Поделиться
          </span>
        </div>
        <div
          className={cn(
            styles.share_shareDropdown,
            dropdownActive && styles.share_shareDropdown_active
          )}
        >
          <div
            onClick={handleTelegramClick}
            className={styles.share_shareDropdown_tg}
          >
            <TgIcon />
            <button className={styles.share_shareDropdown_tg_btn}>
              Telegram
            </button>
          </div>
          <div
            onClick={handleWhatsAppClick}
            className={styles.share_shareDropdown_wh}
          >
            <WhIcon />
            <button className={styles.share_shareDropdown_wh_btn}>
              WhatsApp
            </button>
          </div>
          <div
            onClick={handleCopyLink}
            className={styles.share_shareDropdown_copy}
          >
            <CopyIcon />
            <button className={styles.share_shareDropdown_copy_btn}>
              Скопировать ссылку
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemPriceCard;
