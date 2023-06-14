import React, { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./CommentIcons.module.css";

import hideIcon from "../../image/hide.png";
import starIcon from "../../image/star.png";
import starActiveIcon from "../../image/star_active.png";
import sendIcon from "../../image/send.png";
import paramsIcon from "../../image/params.png";

export default function CommentIcons({ className, id }) {
  const [isFavor, setIsFavor] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(id)) {
      setIsFavor(true);
    }
  }, [id]);

  const addInFavor = () => {
    if (!isFavor) {
      localStorage.setItem(id, id);
    } else {
      localStorage.removeItem(id);
    }
    setIsFavor(!isFavor);
  };

  return (
    <div className={clsx(styles.wrapper, className)}>
      <img src={sendIcon} alt=""></img>
      <img src={hideIcon} alt=""></img>
      <img src={paramsIcon} alt=""></img>
      <span onClick={addInFavor}>
        {isFavor ? (
          <img src={starActiveIcon} alt=""></img>
        ) : (
          <img src={starIcon} alt=""></img>
        )}
      </span>
    </div>
  );
}
