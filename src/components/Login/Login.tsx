import React, { useState } from 'react';
import './Login.css';
import { loginUser } from '../../core/user-web';
import { useDispatch } from 'react-redux';
import { StoreActions } from '../../datatypes';
import { GENERAL_ERROR_MESSAGE, USERID } from '../../constants';
import { useNavigate } from 'react-router-dom';
import TWButton from '../TWButton';

const Login = ({ onTabChange }: { onTabChange: (tab: 'login' | 'register') => void }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      email,
      password
    };

    try {
      const res = await loginUser(payload);
      if (!res.ok) {
        const data = await res.json();
        alert(data?.message ?? GENERAL_ERROR_MESSAGE);
      } else {
        const data = await res.json();
        dispatch({
          type: StoreActions.UPDATE_USER,
          data
        });
        localStorage.setItem(USERID, data.user_id);
        navigate('/');
      }
    } catch (err) {
      alert(GENERAL_ERROR_MESSAGE);
    }
    setLoading(false);
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
      <TWButton text='Login' type='submit' loading={loading} classes='login-btn' />
    </form>
  )
}

export default Login;