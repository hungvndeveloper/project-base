import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addTodo } from '../store/todo/todoSlice';
import { TodoItem } from '../components/TodoItem';
import './TodoPage.css';

/**
 * Trang chính hiển thị danh sách todos
 * Cho phép thêm, xóa và cập nhật todos
 * 
 * @component
 */
export const TodoPage = () => {
  // Local state cho input field
  const [newTodo, setNewTodo] = useState('');
  
  // Redux hooks
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  /**
   * Xử lý sự kiện submit form thêm todo mới
   * @param e - Form event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo.trim()));
      setNewTodo('');
    }
  };

  return (
    <div className="todo-page">
      <h1>Todo List</h1>
      <div className="todo-container">
        {/* Form thêm todo mới */}
        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new todo"
            className="todo-input"
            aria-label="new todo input"
          />
          <button 
            type="submit" 
            disabled={!newTodo.trim()}
            className="add-button"
            aria-label="add todo"
          >
            Add
          </button>
        </form>

        {/* Danh sách todos */}
        <ul className="todo-list" aria-label="todo list">
          {todos.map((todo) => (
            <li key={todo.id}>
              <TodoItem todo={todo} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}; 