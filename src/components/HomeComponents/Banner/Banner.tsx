"use client"
import cn from "clsx";
import styles from "./style.module.scss";
import BannerSwiper from "./BannerSwiper/BannerSwiper";
import useMediaQuery from "@/hooks/useMediaQuery";
import {  IIntroBanner, IIntroBannerDekstop } from "@/types/Home/banner";

interface IBannerProps {
  mobileData: IIntroBanner;
  deskstopData: IIntroBannerDekstop;
}

const Banner = ({ mobileData, deskstopData }: IBannerProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section className="intro__banner">
      <div className={cn(styles.intro__banner_container, "container")}>
        <BannerSwiper slides={isMobile ? mobileData.product : deskstopData.baner}  />
      </div>
    </section>
  );
};

export default Banner;
