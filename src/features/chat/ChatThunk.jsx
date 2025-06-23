// /src/features/chat/chatThunks.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { fetchChatHistory, sendChatMessage } from './ChatApi';

export const fetchChatHistoryAsync = createAsyncThunk(
    'chat/fetchHistory',
    async () => {
        const response = await fetchChatHistory();
        return response.data;
    }
);

export const sendChatMessageAsync = createAsyncThunk(
    'chat/sendMessage',
    async (payload) => {
        const response = await sendChatMessage(payload);
        toast.success('Message sent!');
        return response.data;
    }
);
