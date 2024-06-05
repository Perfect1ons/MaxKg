import { Items } from "@/types/CardProduct/cardProduct";
import ItemBanner from "../ItemBanner/ItemBanner";
import ItemPriceCard from "../ItemPriceCard/ItemPriceCard";
import styles from "./style.module.scss";

interface IPriceCardProps {
  data: Items;
}

export default function ItemPriceCardWrap({ data }: IPriceCardProps) {
  return (
    <div className={styles.priceCard_wrap}>
      <ItemPriceCard data={data} />
      <ItemBanner />
    </div>
  );
}
