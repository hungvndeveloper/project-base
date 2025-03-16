import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addTodo } from '../store/todo/todoSlice';
import { TodoItem } from '../components/TodoItem';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  Box,
  Paper,
} from '@mui/material';

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
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Todo List
        </Typography>
        <Paper sx={{ p: 2 }}>
          {/* Form thêm todo mới */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add new todo"
                variant="outlined"
                size="small"
                aria-label="new todo input"
              />
              <Button 
                type="submit" 
                variant="contained" 
                disabled={!newTodo.trim()}
                aria-label="add todo"
              >
                Add
              </Button>
            </Box>
          </form>

          {/* Danh sách todos */}
          <List aria-label="todo list">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
}; 