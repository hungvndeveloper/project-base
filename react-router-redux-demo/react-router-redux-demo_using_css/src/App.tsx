import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Layout } from './components/Layout';
import { TodoPage } from './pages/TodoPage';
import { AboutPage } from './pages/AboutPage';

/**
 * Component gốc của ứng dụng
 * Cấu hình Redux Provider, Router và các routes
 * 
 * @component
 */
function App() {
  return (
    <Provider store={store}>
      {/* Cấu hình Router */}
      <Router>
        <Routes>
          {/* Route chính với Layout */}
          <Route path="/" element={<Layout />}>
            {/* Route mặc định - Trang Todo */}
            <Route index element={<TodoPage />} />
            {/* Route About */}
            <Route path="about" element={<AboutPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
