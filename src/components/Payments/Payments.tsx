import Card from '../Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { StoreActions, type InitialState } from '../../datatypes';
import { getNextDueDate } from '../../utils';
import { useEffect, useState } from 'react';
import { USERID } from '../../constants';
import { getAllPayments } from '../../core/payment-web';

const Payments = () => {
  const [loading, setLoading] = useState(true);
  const payments = useSelector((state: InitialState) => state.payments);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem(USERID);
    async function fetchPayments() {
      if (userId) {
        try {
          const data = await getAllPayments(userId);
          dispatch({
            type: StoreActions.UPDATE_PAYMENTS,
            data
          });
        } catch (err) {
          console.error('failed to fetch transactions: ', err);
        }
      }
      setLoading(false);
    }
    fetchPayments();
  }, []);
  return (
    <>
      <Card heading="Upcoming Payments" loading={loading}>
        <ul className='content-container payments'>
          {payments.map(payment => {
            return <li key={payment.name} className='payment'>
              <div className='payment-field'>
                <h4 className='payment-name'>{payment.name}</h4>
                <p className='payment-subtext'>Due: {getNextDueDate(payment.due_date)}</p>
              </div>
              <div className='payment-field'>
                <h3 className='payment-pill'>₹{payment.amount}</h3>
                <p className='payment-subtext'>Paid {payment.months_remaining}/{payment.total_months} months</p>
              </div>
            </li>
          })}
        </ul>
      </Card>
    </>
  )
}

export default Payments;