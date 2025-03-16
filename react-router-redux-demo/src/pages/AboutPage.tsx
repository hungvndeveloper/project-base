import { Container, Typography, Box, Paper } from '@mui/material';

/**
 * Trang About hiển thị thông tin về ứng dụng
 * Giới thiệu các công nghệ được sử dụng
 * 
 * @component
 */
export const AboutPage = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        {/* Tiêu đề trang */}
        <Typography variant="h4" component="h1" gutterBottom>
          About
        </Typography>

        {/* Nội dung giới thiệu */}
        <Paper sx={{ p: 2 }}>
          <Typography paragraph>
            This is a simple Todo application built with React, Redux Toolkit, and Material-UI.
            It demonstrates the usage of:
          </Typography>
          <Typography component="ul" sx={{ pl: 2 }}>
            <li>React Router for navigation</li>
            <li>Redux Toolkit for state management</li>
            <li>Material-UI for styling</li>
            <li>TypeScript for type safety</li>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}; 