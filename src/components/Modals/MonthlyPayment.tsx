import { useState } from 'react';
import './MonthlyPayment.css';
import { useDispatch } from 'react-redux';
import { StoreActions } from '../../datatypes';

const MonthlyPayment = ({ onClose }: MonthlyPaymentProps) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [months, setMonths] = useState('');
  const [remaining, setRemaining] = useState('');
  const [dueDay, setDueDay] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch({
      type: StoreActions.UPDATE_PAYMENTS,
      data: {
        name: name,
        amount: Number(amount),
        totalMonths: Number(months),
        monthsRemaining: Number(remaining),
        dueDate: Number(dueDay),
      }
    });
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
          autoFocus
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
          type="number"
          value={dueDay}
          onChange={(e) => setDueDay(e.target.value)}
          min={1}
          max={31}
          required
          placeholder="e.g., 10"
        />
      </div>

      <div className="footer">
        <div className="modal-btn-group">
          <button type='button' className='btn' onClick={onClose}>Cancel</button>
          <button type='submit' className='btn submit-btn'>Add Payment</button>
        </div>
      </div>
    </form>
  )
}

type MonthlyPaymentProps = {
  onClose: () => void;
}

export default MonthlyPayment;