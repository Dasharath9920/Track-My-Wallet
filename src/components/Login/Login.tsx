import React, { useState } from 'react';
import './Login.css';
import { loginUser } from '../../core/user-web';
import { useDispatch } from 'react-redux';
import { StoreActions } from '../../datatypes';
import { USERID } from '../../constants';

const Login = ({ onTabChange }: { onTabChange: (tab: 'login' | 'register') => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      email,
      password
    };

    const res = await loginUser(payload);
    if (!res.ok) {
      console.log('something went wrong');
    } else {
      const data = await res.json();
      dispatch({
        type: StoreActions.UPDATE_USER,
        data
      });
      localStorage.setItem(USERID, data.user_id);
    }
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
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div className="input-field">
        <label htmlFor="password">Password</label>
        <input
          id='password'
          name='password'
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <p className='tab-switch-text'>Don't have an account? <button className='btn-link' onClick={() => onTabChange('register')}>Register.</button></p>
      <button type='submit' className='btn login-btn'>Login</button>
    </form>
  )
}

export default Login;