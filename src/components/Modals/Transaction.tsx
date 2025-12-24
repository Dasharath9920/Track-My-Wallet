import React, { useState } from 'react';
import './MonthlyPayment.css';
import { useDispatch } from 'react-redux';
import { StoreActions } from '../../datatypes';
import { AMOUNT_CATEGORIES } from '../Dashboard/data';

const Transaction = ({ onClose }: TransactionProps) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [date, setDate] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: StoreActions.ADD_TRANSACTION,
      data: {
        category: category,
        amount: Number(amount),
        customCategory,
        date,
      }
    });
    onClose();
  }

  return (
    <form className='monthly-payment-container' onSubmit={handleSubmit}>
      <h3 className='modal-header'>Add New Monthly Payment</h3>
      <div className="input-field">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name='category'
          value={category}
          onChange={e => setCategory(e.target.value)}
          required>
          <option value="" disabled>Select a Category</option>
          {
            Object.keys(AMOUNT_CATEGORIES).map((category: string) => (
              <option key={category} value={AMOUNT_CATEGORIES[category]}>{AMOUNT_CATEGORIES[category]}</option>
            ))
          }
        </select>
      </div>
      {category === AMOUNT_CATEGORIES.OTHER && <div className="input-field">
        <label htmlFor="customCategory">Custom Category</label>
        <input
          id='customCategory'
          name='customCategory'
          type="string"
          value={customCategory}
          onChange={e => setCustomCategory(e.target.value)}
          required
          placeholder='e.g., Went on a trip' />
      </div>
      }
      <div className="input-field">
        <label htmlFor="amount">Amount Spent</label>
        <input
          id='amount'
          name='amount'
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          min={1}
          required
          placeholder='Enter amount'
          inputMode='numeric' />
      </div>
      <div className="input-field">
        <label htmlFor="date">Date of Transaction</label>
        <input
          id="date"
          name="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="footer">
        <div className="modal-btn-group">
          <button type='button' className='btn' onClick={onClose}>Cancel</button>
          <button type='submit' className='btn submit-btn'>Add Transaction</button>
        </div>
      </div>
    </form>
  )
}

type TransactionProps = {
  onClose: () => void;
}

export default Transaction;