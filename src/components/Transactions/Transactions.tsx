import Card from '../Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { StoreActions, type InitialState } from '../../datatypes';
import { useEffect, useState } from 'react';
import { getAllTransactions } from '../../core/transaction-web';
import { USERID } from '../../constants';

const Transactions = () => {
  const [loading, setLoading] = useState(true);
  const transactions = useSelector((state: InitialState) => state.transactions);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem(USERID);
    async function fetchTransactions() {
      if (userId) {
        try {
          const data = await getAllTransactions(userId);
          dispatch({
            type: StoreActions.UPDATE_TRANSACTIONS,
            data
          });
        } catch (err) {
          console.error('failed to fetch transactions: ', err);
        }
      }
      setLoading(false);
    }
    fetchTransactions();
  }, []);

  return (
    <>
      <Card heading="Recent Transactions" loading={loading}>
        <ul className='content-container payments'>
          {transactions.map(transaction => {
            return <li key={transaction.id} className='payment'>
              <div className='payment-field'>
                <h4 className='payment-name'>{transaction.category}</h4>
                <p className='payment-subtext'>{transaction.date_of_transaction.split('T')[0]}</p>
              </div>
              <h3 className='payment-pill'>₹{transaction.amount}</h3>
            </li>
          })
          }
        </ul>
      </Card></>
  )
}

export default Transactions;