import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoState } from '../../types/todo.types';

/**
 * State khởi tạo cho todo slice
 * Bao gồm mảng todos rỗng, status ban đầu là idle và không có lỗi
 */
const initialState: TodoState = {
  todos: [],
  status: 'idle',
  error: null,
};

/**
 * Slice quản lý state của todos
 * Sử dụng createSlice từ Redux Toolkit để tự động tạo actions và reducers
 */
export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    /**
     * Action thêm một todo mới
     * @param state - Current state
     * @param action - Action chứa nội dung todo cần thêm
     */
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
    },

    /**
     * Action chuyển đổi trạng thái completed của todo
     * @param state - Current state
     * @param action - Action chứa id của todo cần toggle
     */
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    /**
     * Action xóa một todo
     * @param state - Current state
     * @param action - Action chứa id của todo cần xóa
     */
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
});

// Export các action creators
export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;

// Export reducer
export default todoSlice.reducer; 