import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setData = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://5000-plum-felidae-kw2hvhglljg.ws-us93.gitpod.io/adminLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.status === 200) {
        localStorage.setItem('token', data.token);
        window.alert('Login Successful');
        navigate('/');  // Use navigate instead of history.push
      } else {
        throw new Error('Invalid Credentials');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      window.alert('Login Failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-6 offset-md-3 offset-sm-1 ">
          <form onSubmit={setData}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <NavLink to="/register">Didn't Register, then register here!</NavLink>
            <br />
            <br />
            <button type="submit" className="btn btn-primary" id="login" name="login">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;



