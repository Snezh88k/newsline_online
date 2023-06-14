import React, { useEffect, useState } from "react";
import "./App.css";
import CommentsFeed from "./components/comments_feed/CommentsFeed";
import { useDispatch, useSelector } from "react-redux";
import { changePositionMessage } from "./store/slice/commentsSlice";

function App() {
  const [scrollActive, setScroolActive] = useState(true);

  const positionNewMessage = useSelector(
    (state) => state.comments.positionNewMessage
  );

  const dispatch = useDispatch();

  const nameField = React.useRef(null);
  const coomentsFeed = React.useRef(null);

  const messages = useSelector((state) => state.comments.messages);

  useEffect(() => {
    if (scrollActive) {
      if (positionNewMessage) {
        nameField.current.scrollTo(0, coomentsFeed.current.offsetHeight);
      } else {
        nameField.current.scrollTo(0, 0);
      }
    }
  }, [messages, positionNewMessage, scrollActive]);

  return (
    <div className="App">
      <div className="control-bar">
        <div>
          <label>
            Порядок сообщений
            <input
              type="checkbox"
              name="position"
              onChange={() => dispatch(changePositionMessage())}
            />
          </label>
        </div>
        <div>
          <label>
            Автоматическая прокрутка
            <input
              type="checkbox"
              name="scroll"
              onChange={() => setScroolActive(!scrollActive)}
              defaultChecked={true}
            />
          </label>
        </div>
      </div>
      <div className="comments-feed_wrapper" ref={nameField}>
        <div ref={coomentsFeed}>
          <CommentsFeed />
        </div>
      </div>
    </div>
  );
}

export default App;
