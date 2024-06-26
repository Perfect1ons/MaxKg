import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cart.reducer";

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Предполагая, что cartReducer - это ваш редюсер корзины
    // Другие редюсеры, если есть
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
