import { Items } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import cn from "clsx";
import DOMPurify from "dompurify";
import { Cross } from "../../../../public/Icons/Icons";
interface IProductReviewProps {
  data: Items;
  func: () => void;
  visible: boolean;
}
const ItemDescriptionModal = ({ data, func, visible }: IProductReviewProps) => {
  return (
    <div className={styles.container}>
      <div className={cn(styles.wrapper, { [styles.visible]: visible })}>
        <div className={styles.aboutProduct}>
          <div className={styles.aboutProduct__container}>
            <h2 className={styles.aboutProduct__container__h2}>О товаре</h2>
            <button
              onClick={func}
              className={styles.aboutProduct__container__btn}
            >
              <Cross />
            </button>
          </div>
          <div className={styles.aboutProduct__description}>
            <p
              className={styles.aboutProduct__description_p}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.description),
              }}
            />
          </div>
        </div>
        <div className={styles.aboutProduct}>
          <h2 className={styles.aboutProduct__h2}>Характеристики</h2>
          <div className={styles.aboutProduct__description}>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.specification),
              }}
              className={styles.aboutProduct__description_p}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDescriptionModal;