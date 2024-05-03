"use client"
import { IFooterItem } from "@/types/footerRequest";
import styles from "./style.module.scss";
import Link from "next/link";
import cn from "clsx";
import { usePathname } from "next/navigation";
import React from "react";

interface ILinksSidebarProps {
  links: IFooterItem[];
}

const LinksSidebar = ({ links }: ILinksSidebarProps) => {

    const pathname = usePathname();

  return (
    <aside className={cn(styles.sidebar, "container")}>
      {links.map((item) => {
        return (
          <div key={item.id} className={styles.sidebarItem}>
            <div className={styles.sidebarItemInfo}>
              <h6 className={styles.sidebarItemInfoTitle}>{item.name}</h6>
            </div>
            <div className={styles.sidebarItemLinks}>
              {item.pod_menu.map((podItem) => {
                const linkUrl = podItem.url.startsWith("https://")
                  ? podItem.url
                  : `/${podItem.url}`;
                return (
                  <React.Fragment key={podItem.id}>
                    <Link className={cn(pathname === linkUrl ? styles.sidebarItemLinksLinkActive : styles.sidebarItemLinksLink)} href={linkUrl}>
                      {podItem.naim}
                    </Link>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        );
      })}
    </aside>
  );
};

export default LinksSidebar;