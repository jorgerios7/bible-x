export const userPath = (userId: string) => `users/${userId}`;
export const favoritesPath = (userId: string) => `users/${userId}/favorites`;
export const notesPath = (userId: string) => `users/${userId}/notes`;
export const chatsPath = (userId: string) => `users/${userId}/chats`;
export const messagesPath = (userId: string, chatId: string) =>
  `users/${userId}/chats/${chatId}/messages`;
export const readingPlansPath = (userId: string) => `users/${userId}/readingPlans`;
