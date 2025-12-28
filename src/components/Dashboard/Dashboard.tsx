import { useState } from 'react';
import './Dashboard.css'
import { modalTypes, type InitialState } from '../../datatypes';
import MonthlyPayment from '../Modals/MonthlyPayment';
import Transaction from '../Modals/Transaction';
import OverviewChart from '../Chart/OverviewChart';
import CategorySpendPie from '../Chart/CategorySpendPie';
import Transactions from '../Transactions/Transactions';
import Payments from '../Payments/Payments';
import DashboardStatistics from '../AmountCard/DashboardStatistics';
import { useSelector } from 'react-redux';
import { getFullName, isMobileDevice } from '../../utils';

const Dashboard = () => {
  const user = useSelector((state: InitialState) => state.user);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<modalTypes>(modalTypes.Transaction);

  const handleToggleModal = (modalType: modalTypes) => {
    const openModal = !open;
    setOpen(openModal);
    setModalType(modalType);
  }

  return (
    <div className='dashboard'>
      <div className='header'>
        {!isMobileDevice() && <h3 className='dashboard-header-text'>Welcome Back, {getFullName(user?.firstName ?? '', user?.lastName ?? '')}!</h3>}
        <div className="dashboard-btn-group">
          <button className='add-entry-btn' onClick={() => handleToggleModal(modalTypes.Transaction)}>+ Add New Transaction</button>
          <button className='add-entry-btn' onClick={() => handleToggleModal(modalTypes.MonthlyPayment)}>+ Add New Payment</button>
        </div>
      </div>

      <div className='card-container'>
        <DashboardStatistics />
      </div>

      <div className={`card-container ${!isMobileDevice() ? 'two-third-layout' : ''}`}>
        <OverviewChart />
        <Payments />
      </div>

      <div className={`card-container transaction-summary-container ${!isMobileDevice() ? 'one-third-layout' : ''}`}>
        <Transactions />
        <CategorySpendPie />
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