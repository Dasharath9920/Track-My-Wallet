import { useState } from 'react';
import AmountCard from '../AmountCard/AmountCard';
import Card from '../Card/Card';
import './Dashboard.css'
import { data } from './data';
import { modalTypes, type InitialState } from '../../datatypes';
import MonthlyPayment from '../Modals/MonthlyPayment';
import { useSelector } from 'react-redux';
import { getNextDueDate } from '../../utils';
import Transaction from '../Modals/Transaction';
import OverviewChart from '../Chart/OverviewChart';
import CategorySpendPie from '../Chart/CategorySpendPie';

const Dashboard = () => {

  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<modalTypes>(modalTypes.Transaction);

  const payments = useSelector((state: InitialState) => state.payments);
  const transactions = useSelector((state: InitialState) => state.transactions);

  const handleToggleModal = (modalType: modalTypes) => {
    const openModal = !open;
    setOpen(openModal);
    setModalType(modalType);
  }

  return (
    <div className='dashboard'>
      <div className='header'>
        <h3 className='dashboard-header-text'>Welcome Back, Dasharath!</h3>
        <div className="btn-group">
          <button className='add-entry-btn' onClick={() => handleToggleModal(modalTypes.Transaction)}>+ Add New Transaction</button>
          <button className='add-entry-btn' onClick={() => handleToggleModal(modalTypes.MonthlyPayment)}>+ Add Monthly Payment</button>
        </div>
      </div>

      <div className='card-container'>
        {data.map(card => {
          return <AmountCard key={card.title} title={card.title} subTitle={card.subTitle} heading={card.heading} backgroundColor={card.backgroundColor} />
        })}
      </div>

      <div className='card-container'>
        <Card heading="Spending Overview">
          <div className='content-container'>
            <OverviewChart />
          </div>
        </Card>
        <Card heading="Upcoming Payments">
          <ul className='content-container payments'>
            {payments.map(payment => {
              return <li key={payment.name} className='payment'>
                <div className='payment-field'>
                  <h4 className='payment-name'>{payment.name}</h4>
                  <p className='payment-subtext'>Due: {getNextDueDate(payment.dueDate)}</p>
                </div>
                <div className='payment-field'>
                  <h3 className='payment-pill'>₹{payment.amount}</h3>
                  <p className='payment-subtext'>Paid {payment.monthsRemaining}/{payment.totalMonths} months</p>
                </div>
              </li>
            })}
          </ul>
        </Card>
      </div>

      <div className="card-container transaction-summary-container">
        <Card heading="Recent Transactions">
          <ul className='content-container payments'>
            {transactions.map(transaction => {
              return <li key={transaction.category} className='payment'>
                <div className='payment-field'>
                  <h4 className='payment-name'>{transaction.category}</h4>
                  <p className='payment-subtext'>{transaction.date}</p>
                </div>
                <h3 className='payment-pill'>₹{transaction.amount}</h3>
              </li>
            })
            }
          </ul>
        </Card>
        <Card heading="Expense Breakdown">
          <p className='content-container'>
            <CategorySpendPie />
          </p>
        </Card>
      </div>

      {open && modalType === modalTypes.MonthlyPayment && <div className='modal-container'>
        <MonthlyPayment onClose={() => setOpen(false)} />
      </div>}
      {open && modalType === modalTypes.Transaction && <div className='modal-container'>
        <Transaction onClose={() => setOpen(false)} />
      </div>}
    </div>
  )
}

export default Dashboard;