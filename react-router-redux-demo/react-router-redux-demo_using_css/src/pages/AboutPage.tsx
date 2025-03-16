import './AboutPage.css';

/**
 * Trang About hiển thị thông tin về ứng dụng
 * Giới thiệu các công nghệ được sử dụng
 * 
 * @component
 */
export const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>About</h1>
      <div className="about-content">
        <p>
          This is a simple Todo application built with React and Redux Toolkit.
          It demonstrates the usage of:
        </p>
        <ul>
          <li>React Router for navigation</li>
          <li>Redux Toolkit for state management</li>
          <li>CSS for styling</li>
          <li>TypeScript for type safety</li>
        </ul>
      </div>
    </div>
  );
}; 