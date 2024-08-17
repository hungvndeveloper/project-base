import { useEffect, useState } from 'react'

const baseApi = 'https://testcookie.com:3000/api';

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [fields, setFields] = useState({
    email: 'nguyenvana@gmail.com',
    password: '123456'
  });

  const setFieldsValue = ({ target: { name, value } }) => {
    setFields(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleLogin = e => {
    e.preventDefault();
    setError('');
    fetch(`${baseApi}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(fields)
    })
      .then(res => {
        if (res.ok) return res.json();
        throw res;
      })
      .then(user => {
        console.log(user);
      })
      .catch((error) => {
        if (error.status === 401) {
          return setError('Email hoặc mật khẩu không chính xác');
        }
        setError('Lỗi không xác định! Liên hệ contact@abc.com để được hỗ trợ!');
      });
  }

  useEffect(() => {
    fetch(`${baseApi}/auth/me`, {
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) return res.json();
        throw res;
      })
      .then(me => {
        setUser(me);
      })
      .catch(() => {
      });
  })

  return (
    <div>
      {user ? (
        <p>Xin chào, {user.name}</p>
      ) : (
        <>
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              value={fields.email}
              onChange={setFieldsValue}
            />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
              value={fields.password}
              onChange={setFieldsValue}
            />
            <br />
            <button>Login</button>
          </form>
          {!!error && <p style={{ color: 'red' }}>{error}</p>}
        </>
      )}
    </div>
  )
}

export default App
