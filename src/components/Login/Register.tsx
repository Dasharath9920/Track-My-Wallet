import React from 'react';
import './Login.css';

const Register = ({ onTabChange }: { onTabChange: (tab: 'login' | 'register') => void }) => {

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="input-field">
        <label htmlFor="firstName">First Name</label>
        <input
          id='firstName'
          name='firstName'
          type="text"
          required
        />
      </div>
      <div className="input-field">
        <label htmlFor="lastName">Last Name</label>
        <input
          id='lastName'
          name='lastName'
          type="text"
          required
        />
      </div>
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

      <div className="input-field">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id='confirmPassword'
          name='confirmPassword'
          type="password"
          required
        />
      </div>

      <p className='tab-switch-text'>Already have an account? <button className='btn-link' onClick={() => onTabChange('login')}>Login.</button></p>
      <button type='submit' className='btn login-btn'>Register</button>
    </form>
  )
}

export default Register;