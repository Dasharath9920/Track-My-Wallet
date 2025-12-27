import './DashboardStatistics.css';
import { useDispatch, useSelector } from 'react-redux';
import { StoreActions, type InitialState } from '../../datatypes';
import { useEffect } from 'react';
import { USERID } from '../../constants';
import { dashboardStatistics } from '../../utils';

const DashboardStatistics = () => {
  const statistics = useSelector((state: InitialState) => state.statistics);
  const dispatch = useDispatch();
  async function fetchStatistics() {
    const userId = localStorage.getItem(USERID);
    if (userId) {
      const data = await dashboardStatistics(userId);
      dispatch({
        type: StoreActions.UPDATE_STATISTICS,
        data
      });
    }
  }
  useEffect(() => {
    fetchStatistics();
  }, []);
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