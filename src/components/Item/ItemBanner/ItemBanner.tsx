"use client";
import { BrandsAll } from "@/types/bannerAll";
import Image from "next/image";
import Link from "next/link";

interface IBanner {
  banner: BrandsAll;
}

const ItemBanner = ({ banner }: IBanner) => {
  const imageUrl = `https://max.kg/bimages/baner/baner_960.jpg`;

  return (
    <Link
      className="topten"
      href="/catalog/bytovaya-tehnika-i-elektronika/tehnika-dlya-ofisa/laminatory-i-rashodnye-materialy/laminatory"
    >
      <Image
        className="testoviy"
        src={imageUrl}
        width={344}
        height={143}
        alt="ЛАМИНАААААТ"
      />
    </Link>
  );
};

export default ItemBanner;