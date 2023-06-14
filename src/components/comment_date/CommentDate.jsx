import React, { useEffect, useState } from "react";
import styles from "./CommentDate.module.css";

export default function CommentDate({ date }) {
  const [publicationTime, setPublicationTime] = useState("");

  useEffect(() => {
    const ms = Date.parse(date);
    const fullDate = new Date(ms);
    setPublicationTime(
      `${fullDate.getHours()}:${
        fullDate.getMinutes().toString().length === 1 ? "0" : ""
      }${fullDate.getMinutes()}`
    );
  }, [date]);
  return <div className={styles.date}>{publicationTime}</div>;
}
