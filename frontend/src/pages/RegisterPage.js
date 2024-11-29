// frontend/src/components/RegisterPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import Swal from 'sweetalert2';

function RegisterPage() {
  const [nik, setNik] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nik, name, email, password, position }),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Register Successful',
          text: 'You can now log in with your account'
        }).then(() => {
          navigate('/login');
        })
      } else {
        const data = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Register Failed',
          text: data.error || 'Registration failed. Please try again.',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred. Please try again later.',
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>PT<strong>XYZ</strong></h2>
        <p>Form Register</p>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Nik" 
              className="form-input" 
              value={nik} 
              onChange={(e) => setNik(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Name" 
              className="form-input" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email" 
              className="form-input" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
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
          </div>
          <div className="input-group">
            <select 
              className="form-input" 
              value={position} 
              onChange={(e) => setPosition(e.target.value)} 
              required
            >
              <option value="" disabled>Select Position</option>
              <option value="Staff">Staff</option>
              <option value="Asisten Manager">Asisten Manager</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn-sign-in">Register</button>
        </form>
        <div className="or-divider">
          <span>- OR -</span>
        </div>
        <div className="links">
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
