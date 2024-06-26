"use client";
import styles from "./style.module.scss";
import Link from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { url } from "@/components/temporary/data";
import { IDiscountsById } from "@/types/Discounts/discountById";
import Cards from "@/components/UI/Card/Card";

export interface IDiscountProps {
  discount: IDiscountsById;
}

const DiscountsById = ({ discount }: IDiscountProps) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <section className="news__by_path">
      <div className="container">
        <div className="all__directions">
          <Link href={"/"} className="all__directions_link">
            Главная
          </Link>
          <Link href={"/discount"} className="all__directions_link">
            Скидки
          </Link>
          <Link
            href={`${discount.id}`}
            className={clsx(
              "all__directions_link",
              pathname === `/discount/${discount.id}` &&
                "all__directions_linkActive"
            )}
          >
            {discount.promotion.name}
          </Link>
        </div>

        <div className={styles.discountById}>
          <h1 className="default__showMore_title">Скидки</h1>
          <div className={styles.main__discount}>
            <div className={styles.main__discount_images}>
              <Link className="link" href={`/discount/${discount.id}`}>
                <Image
                  className={styles.main__discount_image}
                  src={
                    discount.promotion.image
                      ? `${url}${discount.promotion.image}`
                      : "/img/noPhotoDiscount.svg"
                  }
                  width={450}
                  height={280}
                  alt={discount.promotion.name}
                />
              </Link>
            </div>

            <div className={styles.main__discount_info}>
              <h1
                onClick={() => router.push(`/discount/${discount.id}`)}
                className="allNews__content_title"
              >
                {discount.promotion.name}
              </h1>
              <div className={styles.main__discount_data}>
                <span>
                  До окончания скидки {discount.promotion.word}{" "}
                  {discount.promotion.days} {discount.promotion.word_day}
                </span>
                <span>
                  Период проведения акции: {discount.promotion.message}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cards">
        {discount.product.map((item, index) => {
          return <Cards cardData={item} key={index} />;
        })}
      </div>
    </section>
  );
};

export default DiscountsById;
