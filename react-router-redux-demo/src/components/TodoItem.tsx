import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo } from '../store/todo/todoSlice';
import { Todo } from '../types/todo.types';
import { Checkbox, IconButton, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
  // Hook để dispatch actions
  const dispatch = useDispatch();

  return (
    <ListItem
      secondaryAction={
        <IconButton 
          edge="end" 
          onClick={() => dispatch(removeTodo(todo.id))}
          aria-label="delete todo"
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <Checkbox
        edge="start"
        checked={todo.completed}
        onChange={() => dispatch(toggleTodo(todo.id))}
        aria-label="toggle todo status"
      />
      <ListItemText
        primary={todo.text}
        sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      />
    </ListItem>
  );
}; 