import React from "react";
import styles from "./CommentAttachments.module.css";

export default function CommentAttachments({ attachments }) {
  return (
    <div className={styles.wrapper}>
      {attachments[0] ? (
        attachments[0].type === "video" ? (
          <video controls width="400" height="250">
            <source src={attachments[0].url} />
          </video>
        ) : (
          <img
            className={styles.contentImage}
            src={attachments[0].url}
            alt=""
          />
        )
      ) : (
        ""
      )}
    </div>
  );
}
