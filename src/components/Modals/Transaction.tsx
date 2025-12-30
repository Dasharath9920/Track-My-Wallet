import React, { useState } from 'react';
import './MonthlyPayment.css';
import { useDispatch, useSelector } from 'react-redux';
import { StoreActions, type InitialState } from '../../datatypes';
import { AMOUNT_CATEGORIES } from '../Dashboard/data';
import { addTransaction } from '../../core/transaction-web';
import TWButton from '../TWButton';
import { GENERAL_ERROR_MESSAGE } from '../../constants';

const Transaction = ({ onClose }: TransactionProps) => {
  const today = new Date().toISOString().split('T')[0];
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [date, setDate] = useState(today);
  const user = useSelector((state: InitialState) => state.user);

  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      user_id: user!.user_id,
      amount: Number(amount),
      category,
      customCategory,
      date_of_transaction: date,
    };

    try {
      const res = await addTransaction(payload);
      if (res.ok) {
        const transactions = await res.json();
        dispatch({
          type: StoreActions.UPDATE_TRANSACTIONS,
          data: transactions.data
        });
      }
    } catch (err) {
      alert(err ?? GENERAL_ERROR_MESSAGE);
    }
    setLoading(false);
    onClose();
  }

  return (
    <form className='monthly-payment-container' onSubmit={handleSubmit}>
      <h3 className='modal-header'>Add Transaction</h3>
      <div className="input-field">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name='category'
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
          style={{ padding: '8px', border: '1px solid lightgrey' }}>
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
          <TWButton type='submit' classes='submit-btn' text='Add Transaction' loading={loading} fontSize='.8rem' />
        </div>
      </div>
    </form>
  )
}

type TransactionProps = {
  onClose: () => void;
}

export default Transaction;