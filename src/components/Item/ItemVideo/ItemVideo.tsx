import DOMPurify from "isomorphic-dompurify";
import styles from "./style.module.scss";
import { useState, useEffect } from "react";

interface IVideoProps {
  video: string;
}

const ItemVideo = ({ video }: IVideoProps) => {
  const [cleanHTML, setCleanHTML] = useState("");

  useEffect(() => {
    const sanitizedHTML = DOMPurify.sanitize(video, {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
    });
    setCleanHTML(sanitizedHTML);
  }, [video]);

  return (
    <div className={styles.wrap_video}>
      <div className="productPageVideo">
        <h3 className="sections__title">Видео</h3>
        <div
          dangerouslySetInnerHTML={{ __html: cleanHTML }}
          className={styles.wrap_characteristics}
        />
      </div>
    </div>
  );
};

export default ItemVideo;
