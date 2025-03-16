import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo } from '../store/todo/todoSlice';
import { Todo } from '../types/todo.types';
import './TodoItem.css';

/**
 * Props interface cho TodoItem component
 * @interface TodoItemProps
 */
interface TodoItemProps {
  /** Todo item cần hiển thị */
  todo: Todo;
}

/**
 * Component hiển thị một todo item
 * Cho phép toggle trạng thái và xóa todo
 * 
 * @component
 * @param {TodoItemProps} props - Props cho component
 */
export const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(toggleTodo(todo.id))}
        className="todo-checkbox"
        aria-label="toggle todo status"
      />
      <span 
        className={`todo-text ${todo.completed ? 'completed' : ''}`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => dispatch(removeTodo(todo.id))}
        className="delete-button"
        aria-label="delete todo"
      >
        ×
      </button>
    </div>
  );
}; 