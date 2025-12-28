import Card from '../Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { StoreActions, type InitialState } from '../../datatypes';
import { formatINR, getNextDueDate } from '../../utils';
import { useEffect, useState } from 'react';
import { USERID } from '../../constants';
import { getUpcomingPayments } from '../../core/payment-web';

const Payments = () => {
  const [loading, setLoading] = useState(true);
  const payments = useSelector((state: InitialState) => state.upcomingPayments);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem(USERID);
    async function fetchPayments() {
      if (userId) {
        try {
          let data = await getUpcomingPayments(userId);
          dispatch({
            type: StoreActions.UPDATE_UPCOMING_PAYMENTS,
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
              <div className='payment-field payment-field-right'>
                <h3 className='payment-pill'>{formatINR(payment.amount)}</h3>
                <p className='payment-subtext'>Paid {payment.total_months - payment.months_remaining}/{payment.total_months} months</p>
              </div>
            </li>
          })}
        </ul>
      </Card>
    </>
  )
}

export default Payments;