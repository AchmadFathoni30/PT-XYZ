import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/LoginPage.css';
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

function LoginPage() {
  const navigate = useNavigate();
  const [nik, setNik] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nik, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          try {
            localStorage.setItem('token', data.token);
          } catch (err) {
            console.error('Error saving token:', err);
            Swal.fire({
              icon: 'error',
              title: 'Storage Error',
              text: 'Failed to save login session. Please try again.',
            });
            return;
          }

          // Successful login notification
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'Welcome to the Dashboard!',
          }).then(() => {
            navigate('/dashboard');
          });
        }
      } else {
        // Error notification
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: data.message || 'Invalid credentials. Please try again.',
        });
      }
    } catch (err) {
      console.error('Login error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred. Please try again.',
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>PT<strong>XYZ</strong></h2>
        <p>Sign in to start your session</p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Nik"
              className="form-input"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              required
            />
            <span className="input-icon">
              <FaRegUser />
            </span>
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="input-icon">
              <RiLockPasswordLine />
            </span>
          </div>
          <button type="submit" className="btn-sign-in">Sign In</button>
        </form>
        <div className="or-divider">
          <span>- OR -</span>
        </div>
        <div className="links">
          <Link to="/register">Register a new membership</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
