import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

/**
 * Layout component chính của ứng dụng
 * Bao gồm navigation bar và container cho nội dung
 * 
 * @component
 */
export const Layout = () => {
  return (
    <div className="layout">
      {/* Navigation bar */}
      <nav className="navbar">
        <div className="nav-brand">Todo App</div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Todos</Link>
          <Link to="/about" className="nav-link">About</Link>
        </div>
      </nav>

      {/* Main content container */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}; 