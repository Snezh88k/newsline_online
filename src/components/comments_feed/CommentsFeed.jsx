import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import styles from "./CommentsFeed.module.css";
import {
  fetchPostLastMessage,
  fetchPostMessage,
} from "../../store/slice/commentsSlice";
import CommentCard from "../comment_card/CommentCard";

export default React.memo(function CommentsFeed() {
  const messages = useSelector((state) => state.comments.messages);
  const idLast = useSelector((state) => state.comments.idLastMessage);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostMessage());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchPostLastMessage(idLast));
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch, idLast, messages]);

  return (
    <div>
      {messages.map((comment, index) => {
        return <CommentCard key={comment.id} comment={comment} />;
      })}
    </div>
  );
});
