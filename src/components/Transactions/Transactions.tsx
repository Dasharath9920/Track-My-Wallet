import Card from '../Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { StoreActions, type FilteredTransactions, type InitialState, type TransactionResponse } from '../../datatypes';
import { useEffect, useState } from 'react';
import { deleteTransaction, getAllTransactions } from '../../core/transaction-web';
import { GENERAL_ERROR_MESSAGE, USERID } from '../../constants';
import { formatINR, groupTransactionsByDate } from '../../utils';
import { DELETE_ICON, EIDT_ICON } from '../Dashboard/data';
import './Transactions.css';

const Transactions = ({ onEdit }: { onEdit: (transaction: TransactionResponse) => void }) => {
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState<FilteredTransactions>({});

  const hide = useSelector((state: InitialState) => state.hideAmount);
  const transactions = useSelector((state: InitialState) => state.transactions);

  const userId = localStorage.getItem(USERID);
  const dispatch = useDispatch();

  const handleEditClick = (transaction: TransactionResponse) => {
    onEdit(transaction);
  }

  const handleRemoveClick = async (transaction: TransactionResponse) => {
    const confirm = window.confirm(`Are you sure you want to delete ${transaction.category}?`);
    if (confirm) {
      try {
        const data = await deleteTransaction(userId!, transaction.id);
        dispatch({
          type: StoreActions.UPDATE_TRANSACTIONS,
          data: data
        });
        setFilteredData(groupTransactionsByDate(data));
      } catch (err) {
        alert(err ?? GENERAL_ERROR_MESSAGE);
      }
    }
  }

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
          setFilteredData(groupTransactionsByDate(data));
        } catch (err) {
          console.error('failed to fetch transactions: ', err);
        }
      }
      setLoading(false);
    }
    fetchTransactions();
  }, [transactions]);

  return (
    <>
      <Card heading="Recent Transactions" loading={loading}>
        <ul className='filtered-transactions-container content-container '>
          {Object.keys(filteredData).map(key => {
            return <li key={key} className='filtered-transaction'>
              <div className="filtered-transaction-header">
                <p>{key}</p>
                <h3 className='payment-pill'>Total: {hide ? '••••••' : formatINR(filteredData[key].totalAmount)}</h3>
              </div>
              <ul className='payments'>
                {filteredData[key].data.map(transaction => {
                  return <li key={transaction.id} className='payment'>
                    <div className='payment-left'>
                      <div className='payment-field'>
                        <h4 className='payment-name'>{transaction.custom_category ? transaction.custom_category : transaction.category}</h4>
                      </div>
                      <h3 className='payment-pill'>{hide ? '••••••' : formatINR(transaction.amount)}</h3>
                    </div>
                    <div className="action-btn-group">
                      <button className="btn" onClick={() => handleEditClick(transaction)}><img src={EIDT_ICON} alt="" width={16} height={16} /></button>
                      <button className="btn" onClick={() => handleRemoveClick(transaction)}><img src={DELETE_ICON} alt="" width={16} height={16} /></button>
                    </div>
                  </li>
                })
                }
              </ul>
            </li>
          })}
        </ul>
      </Card></>
  )
}

export default Transactions;