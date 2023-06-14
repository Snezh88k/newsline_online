import React, { useEffect, useState } from "react";
import styles from "./CommentCard.module.css";
import userIcon from "../../image/user.png";
import CommentIcons from "../comment_icons/CommentIcons";
import CommentAttachments from "../comment_attachments/CommentAttachments";
import clsx from "clsx";
import CommentDate from "../comment_date/CommentDate";

export default function CommentCard({ comment }) {
  const [isExpand, setIsExpand] = useState(false);

  const { attachments, author, content, date, id } = comment;

  const nameField = React.useRef(null);

  useEffect(() => {
    if (content.length > 250) {
      nameField.current.style.display = "block";
    } else {
      nameField.current.style.display = "none";
    }
  }, [content.length]);

  function expandComment(e) {
    e.preventDefault();
    setIsExpand(!isExpand);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <div className={styles.authorInfo}>
          <img src={userIcon} alt="user" />
          <div className={styles.authorName}>{author}</div>
        </div>
        <CommentIcons id={id} />
      </div>

      <div className={styles.main}>
        <CommentDate date={date} />
        <div className={styles.contentWrapper}>
          <div className={clsx(styles.content, isExpand ? styles.expand : "")}>
            {content}
          </div>
          <button
            className={styles.expandButton}
            ref={nameField}
            onClick={expandComment}
          >
            Далее
          </button>
          <CommentAttachments attachments={attachments} />
        </div>
      </div>
    </div>
  );
}
