import { Link as RouterLink, Outlet } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';

/**
 * Layout component chính của ứng dụng
 * Bao gồm navigation bar và container cho nội dung
 * Sử dụng Outlet từ React Router để render các routes con
 * 
 * @component
 */
export const Layout = () => {
  return (
    <>
      {/* Navigation bar */}
      <AppBar position="static">
        <Toolbar>
          {/* Logo/App title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>

          {/* Navigation links */}
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/"
            aria-label="navigate to todos"
          >
            Todos
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/about"
            aria-label="navigate to about"
          >
            About
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main content container */}
      <Container>
        <Box sx={{ mt: 4 }}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
}; 