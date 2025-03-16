import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todo/todoSlice';

/**
 * Cấu hình Redux store cho ứng dụng
 * Kết hợp tất cả reducers từ các slices khác nhau
 */
export const store = configureStore({
  reducer: {
    // Reducer quản lý state của todos
    todos: todoReducer,
  },
});

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type của tất cả actions có thể dispatch
export type AppDispatch = typeof store.dispatch; 