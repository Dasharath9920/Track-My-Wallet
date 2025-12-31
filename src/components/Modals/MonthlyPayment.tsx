import React, { useState } from 'react';
import './MonthlyPayment.css';
import { useDispatch, useSelector } from 'react-redux';
import { StoreActions, type InitialState } from '../../datatypes';
import { addPayment } from '../../core/payment-web';
import { GENERAL_ERROR_MESSAGE } from '../../constants';
import TWButton from '../TWButton';
import { isMobileDevice } from '../../utils';

const MonthlyPayment = ({ onClose }: MonthlyPaymentProps) => {
  const today = new Date().toISOString().split('T')[0];
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [months, setMonths] = useState('');
  const [remaining, setRemaining] = useState('');
  const [dueDay, setDueDay] = useState(today);
  const user = useSelector((state: InitialState) => state.user);

  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    const payload = {
      user_id: user!.user_id,
      amount: Number(amount),
      name,
      totalMonths: Number(months),
      monthsRemaining: Number(remaining),
      dueDate: dueDay,
    };

    try {
      const res = await addPayment(payload);
      if (res.ok) {
        const payments = await res.json();
        dispatch({
          type: StoreActions.UPDATE_PAYMENTS,
          data: payments.data
        });
      }
    } catch (error) {
      alert(error ?? GENERAL_ERROR_MESSAGE);
    }
    setLoading(false);
    onClose();
  }

  return (
    <form className='monthly-payment-container' onSubmit={handleSubmit}>
      <h3 className='modal-header'>Add New Monthly Payment</h3>
      <div className="input-field">
        <label htmlFor="paymentName">Payment Name</label>
        <input
          id="paymentName"
          name='paymentName'
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          placeholder='Enter payment name' />
      </div>
      <div className="input-field">
        <label htmlFor="months">Total Months</label>
        <input
          id='months'
          name='months'
          type="number"
          value={months}
          onChange={e => setMonths(e.target.value)}
          min={1}
          required
          placeholder='e.g., 12' />
      </div>
      <div className="input-field">
        <label htmlFor="remaining">Months Remaining</label>
        <input
          id='remaining'
          name='remaining'
          type="number"
          value={remaining}
          onChange={e => setRemaining(e.target.value)}
          min={1}
          max={months}
          required
          placeholder='e.g., 8'
          inputMode='numeric' />
      </div>
      <div className="input-field">
        <label htmlFor="amount">Monthly Amount</label>
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
        <label htmlFor="dueDay">Due Day of Month</label>
        <input
          id="dueDay"
          name="dueDay"
          type="date"
          value={dueDay}
          onChange={(e) => setDueDay(e.target.value)}
          required
        />
      </div>

      <div className="footer">
        <div className="modal-btn-group">
          <button type='button' className='btn' onClick={onClose}>Cancel</button>
          <TWButton type='submit' classes={isMobileDevice() ? '' : 'submit-btn'} text='Add Payment' loading={loading} fontSize='.8rem' />
        </div>
      </div>
    </form>
  )
}

type MonthlyPaymentProps = {
  onClose: () => void;
}

export default MonthlyPayment;