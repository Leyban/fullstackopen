import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { LOGIN } from '../queries';

const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('library-user-token', token);
      setPage('books');
      setUsername('');
      setPassword('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  if (!show) {
    return null;
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Log in</h2>
      <div className="username">
        username:
        <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div className="password">
        username:
        <input type="text" value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
