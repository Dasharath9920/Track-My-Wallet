import React from 'react';
import './Login.css';

const Login = ({ onTabChange }: { onTabChange: (tab: 'login' | 'register') => void }) => {

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="input-field">
        <label htmlFor="email">Email</label>
        <input
          id='email'
          name='email'
          type="email"
          required
        />
      </div>

      <div className="input-field">
        <label htmlFor="password">Password</label>
        <input
          id='password'
          name='password'
          type="password"
          required
        />
      </div>

      <p className='tab-switch-text'>Don't have an account? <button className='btn-link' onClick={() => onTabChange('register')}>Register.</button></p>
      <button type='submit' className='btn login-btn'>Login</button>
    </form>
  )
}

export default Login;