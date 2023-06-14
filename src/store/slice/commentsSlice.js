import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPostMessage = createAsyncThunk(
  "message/fetchPostMessage",

  async function () {
    let formData = new FormData();
    formData.append("messageId", "0");
    formData.append("actionName", "MessagesLoad");

    const response = await fetch(`http://a0830433.xsph.ru/`, {
      method: "POST",
      mode: "no-cors",
      body: formData,
      headers: {
        "Content-Type": "nu/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    }).then((response) => response.json());

    return response;
  }
);

export const fetchPostLastMessage = createAsyncThunk(
  "message/fetchPostMessage",

  async function (id) {
    let formData = new FormData();
    formData.append("messageId", id);
    formData.append("actionName", "MessagesLoad");

    const response = await fetch(`http://a0830433.xsph.ru/`, {
      method: "POST",
      mode: "no-cors",
      body: formData,
      headers: {
        "Content-Type": "nu/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    }).then((response) => response.json());

    return response;
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    idLastMessage: null,
    positionNewMessage: true,
    status: null,
    error: null,
  },
  reducers: {
    changePositionMessage: (state) => {
      state.positionNewMessage = !state.positionNewMessage;
    },
  },
  extraReducers: {
    [fetchPostMessage.pending]: (state, action) => {
      state.status = "Loading";
      state.error = null;
    },
    [fetchPostMessage.fulfilled]: (state, action) => {
      state.status = "resolved";

      state.messages = [...state.messages, ...action.payload.Messages];

      state.idLastMessage =
        action.payload.Messages[action.payload.Messages.length - 1].id;
    },
    [fetchPostMessage.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },

    [fetchPostLastMessage.pending]: (state, action) => {
      state.status = "Loading";
      state.error = null;
    },
    [fetchPostLastMessage.fulfilled]: (state, action) => {
      state.status = "resolved";

      if (action.payload !== "no message") {
        if (state.positionNewMessage) {
          state.messages = [...state.messages, ...action.payload.Messages];
        } else {
          state.messages = [...action.payload.Messages, ...state.messages];
        }

        const array = [...action.payload.Messages];
        const maxId = array.map((item) => item.id);
        state.idLastMessage = Math.max(...maxId);
      } else {
        console.log("Новых сообщений нет!");
      }
    },
    [fetchPostLastMessage.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const { changePositionMessage } = messageSlice.actions;

export default messageSlice.reducer;
