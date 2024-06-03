"use client";
import { Items } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import Image from "next/image";
import { url } from "@/components/temporary/data";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "@/store/reducers/cart.reducer";
import {
  CartIcon,
  CopyIcon,
  GrayFavoritesIcon,
  ShareIcon,
  TgIcon,
  VioletFavoritesIcon,
  WhIcon,
} from "../../../../public/Icons/Icons";
import cn from "clsx";
import { useEffect, useState } from "react";
import CartReducerBtn from "@/components/UI/CartReducerBtn/CartReducerBtn";
import UserInfoModal from "@/components/UI/UserInfoModal/UserInfoModal";
import { RootState } from "@/store";
import OrderModal from "../OrderModal/OrderModal";

interface IPriceProps {
  data: Items;
  func: () => void;
}

const ItemPriceCard = ({ data, func }: IPriceProps) => {
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart.cart);
  const product = cart.find((item) => item.id === data.id);

  const [dropdownActive, setDropdownActive] = useState(false);

  const [modal, setModal] = useState(false);
  const [added, setAdded] = useState(false);

  const [copy, setCopy] = useState(false);

  const handleCopyLink = (entryText: string) => {
    navigator.clipboard
      .writeText(entryText)
      .then(() => {
        setDropdownActive(false);
      })
      .catch((err) => {
        console.error("Ошибка при копировании ссылки: ", err);
        setDropdownActive(false);
      });
    setCopy(true);
    setTimeout(() => setCopy(false), 5000);
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
    setTimeout(() => setModal(false), 5000);
  };

  const handleCartEmpty = () => {
    setAdded(false);
  };

  return (
    <>
      <div className={styles.ItemPriceCard}>
        {data.discount_prc > 0 ? (
          <div className={styles.ItemPriceCard__cost}>
            <h2 className={styles.ItemPriceCard__price_new}>
              {data.cenaok}
              <span className={styles.ItemPriceCard__price_new_custom}>с</span>
            </h2>
            <span className={styles.ItemPriceCard__price_discount}>
              -{data.discount_prc}%
            </span>
            <h2 className={styles.ItemPriceCard__old_price}>
              {data.old_price.toLocaleString("ru-RU")}
              <span className={styles.ItemPriceCard__old_price_custom}>с</span>
            </h2>
          </div>
        ) : (
          <div className={styles.ItemPriceCard__cost}>
            <h2 className={styles.ItemPriceCard__price}>
              {data.cenaok}
              <span className={styles.ItemPriceCard__price_custom}>с</span>
            </h2>
          </div>
        )}
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
        {data.minQty > 1 ? (
          <p className={styles.ItemPriceCard__minQty}>
            минимальное количество к заказу от {data.minQty} шт.
          </p>
        ) : (
          <span className={styles.ItemPriceCard__minQty_none}></span>
        )}
        <div className={styles.ItemPriceCard__buttons}>
          <UserInfoModal visible={modal}>
            Ваш товар добавлен в корзину. <br />
            Перейдите в корзину чтобы оформить заказ!
          </UserInfoModal>
          {!product?.quantity && (
            <button
              onClick={addToCart}
              className={styles.ItemPriceCard__buttons_cart}
            >
              В корзину
            </button>
          )}
          {product?.quantity && (
            <CartReducerBtn data={data} onCartEmpty={handleCartEmpty} />
          )}
          <button onClick={func} className={styles.ItemPriceCard__buttons_buy}>
            Купить
          </button>
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
        <UserInfoModal visible={copy}>
          Ссылка скопирована! <br />
        </UserInfoModal>
        <div className={styles.share_btnControl}>
          <button
            onClick={handleDropdown}
            className={styles.share_btnControl_shareBtn}
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
            onClick={() => handleCopyLink(window.location.href)}
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
