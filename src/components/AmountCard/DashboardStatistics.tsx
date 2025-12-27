import './DashboardStatistics.css';
import { useDispatch, useSelector } from 'react-redux';
import { StoreActions, type InitialState } from '../../datatypes';
import { useEffect } from 'react';
import { USERID } from '../../constants';
import { dashboardStatistics } from '../../utils';
import { getDashboardStatistics } from '../../core/statistics-web';

const DashboardStatistics = () => {
  const statistics = useSelector((state: InitialState) => state.statistics);
  const upcomingPayments = useSelector((state: InitialState) => state.upcomingPayments);
  const dispatch = useDispatch();
  async function fetchStatistics() {
    const userId = localStorage.getItem(USERID);
    if (userId) {
      const statistics = await getDashboardStatistics(userId);
      const data = dashboardStatistics(statistics, upcomingPayments);
      dispatch({
        type: StoreActions.UPDATE_STATISTICS,
        data
      });
    }
  }
  useEffect(() => {
    fetchStatistics();
  }, [upcomingPayments]);
  return (
    <>
      {
        Object.keys(statistics).map(key => {
          return < div key={key} className='amount-card' style={{ backgroundColor: statistics[key].backgroundColor }
          }>
            <p>{key}</p>
            <h2 style={{ margin: '0' }}>{statistics[key].title}</h2>
            <p>{statistics[key].subTitle}</p>
          </div >
        })
      }
    </>
  )
}

export default DashboardStatistics;