"use client";
import { getSubCatalogs } from "@/api/requests";
import { useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { ICatalogHome } from "@/types/Catalog/catalogsHome";
import { ICatalogsChild } from "@/types/Catalog/catalogsChild";

const AllProducts = ({
  catalog,
  category,
}: {
  catalog: ICatalogHome[];
  category: ICatalogsChild;
}) => {
  const [subCatalogs, setSubCatalogs] = useState<ICatalogsChild>();

  const handleMouseEnter = (id: number) => {
    getSubCatalogs(id).then((data) => {
    });
  };

  return (
    <section className={styles.section}>
      {catalog?.map((catalog) => (
        <div className={styles.card_wrap} key={catalog.id}>
          <div className={styles.img_wrap}>
            <Image
              className={styles.img}
              src={
                catalog.icon
                  ? `https://max.kg/${catalog.icon}`
                  : "https://max.kg/images/discount/empty-image.png"
              }
              width={60}
              height={60}
              alt="easter"
            />
          </div>
          <div className={styles.card_desc}>
            <h3 className={styles.card_title}>{catalog.name}</h3>
            <ul>
              <li>item 1</li>
              <li>item 2</li>
              <li>item 3</li>
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
};

export default AllProducts;
