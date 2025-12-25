import React, { useEffect, useState } from 'react'
import Login from './Login';
import Register from './Register';
import './Login.css';

const LoginForm = () => {
  const [loginState, setLoginState] = useState('login');

  const handleTabClick = (tab: 'login' | 'register') => {
    setLoginState(tab);
  }

  return (
    <div className='login-form-container'>
      <div className="login-form">
        <div className="btn-group">
          <button className={`btn tab-btn ${loginState === "login" ? "active" : ""}`} onClick={() => handleTabClick('login')}>Login</button>
          <button className={`btn tab-btn ${loginState === "register" ? "active" : ""}`} onClick={() => handleTabClick('register')}>Register</button>
        </div>
        {loginState === 'login' && <Login onTabChange={handleTabClick} />}
        {loginState === 'register' && <Register onTabChange={handleTabClick} />}
      </div>
    </div>
  )
}

export default LoginForm;