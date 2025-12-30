import React, { useState } from 'react';
import './Login.css';
import { registerUser } from '../../core/user-web';
import { useDispatch } from 'react-redux';
import { StoreActions } from '../../datatypes';
import { GENERAL_ERROR_MESSAGE, USERID } from '../../constants';
import TWButton from '../TWButton';

const Register = ({ onTabChange }: { onTabChange: (tab: 'login' | 'register') => void }) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    const payload = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      const res = await registerUser(payload);
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
      }
    } catch (err) {
      alert(GENERAL_ERROR_MESSAGE);
    }
    setLoading(false);
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
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
      </div>

      <div className="input-field">
        <label htmlFor="lastName">Last Name</label>
        <input
          id='lastName'
          name='lastName'
          type="text"
          required
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
      </div>

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

      <div className="input-field">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id='confirmPassword'
          name='confirmPassword'
          type="password"
          required
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </div>

      <p className='tab-switch-text'>
        Already have an account?{" "}
        <button
          type="button"
          className='btn-link'
          onClick={() => onTabChange('login')}
        >
          Login.
        </button>
      </p>

      <TWButton type='submit' classes='login-btn' text='Register' loading={loading} />
    </form>
  );
}

export default Register;