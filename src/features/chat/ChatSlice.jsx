// /src/features/chat/ChatSlice.js

import { createSlice } from '@reduxjs/toolkit';
import chatInitialState from './ChatInitialState';
import { fetchChatHistoryAsync, sendChatMessageAsync } from './ChatThunk';

const chatSlice = createSlice({
    name: 'chat',
    initialState: chatInitialState,
    reducers: {
        clearMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChatHistoryAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchChatHistoryAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.chats = action.payload;
            })
            .addCase(fetchChatHistoryAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(sendChatMessageAsync.pending, (state) => {
                state.status = 'loading';
                state.message = 'Typing ...'
            })
            .addCase(sendChatMessageAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.message = action.payload.reply;
                state.chats.unshift({
                    reply: action.payload.reply,
                    prompt: action.meta.arg.prompt,
                    text: action.meta.arg.text,
                });
            })
            .addCase(sendChatMessageAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.message = 'Error in getting Answer, Sorry!'
                state.error = action.error.message;
            });
    },
});

export const { clearMessage } = chatSlice.actions;

export default chatSlice.reducer;
