import { configureStore } from '@reduxjs/toolkit';

import { UserSlice } from '../features/user/UserSlice';
import { AuthSlice } from '../features/auth/AuthSlice';
import chatReducer from '../features/chat/ChatSlice';


export const store = configureStore({
    reducer: {
        chat: chatReducer,
        auth: AuthSlice.reducer,
        user: UserSlice.reducer
    },
});
