// /src/features/chat/chatSelectors.js

export const currentMessage = (state) => state.chat.message;
export const selectChat = (state) => state.chat.chats;
export const selectChatStatus = (state) => state.chat.status;
export const selectChatError = (state) => state.chat.error;
