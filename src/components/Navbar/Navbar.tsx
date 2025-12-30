import Avatar from '../Avatar';
import './Navbar.css';
import logo from '../../public/assets/track-my-wallet-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { StoreActions, type InitialState } from '../../datatypes';
import { getFullName, isMobileDevice } from '../../utils';
import { USERID } from '../../constants';
import { useNavigate } from 'react-router-dom';
import ShowHidePill from '../ShowHidePill/ShowHidePill';
import { LOGOUT_ICON } from '../Dashboard/data';

const Navbar = () => {
  const user = useSelector((state: InitialState) => state.user);
  const userName = user ? getFullName(user.firstName, user.lastName) : '';
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutClick = () => {
    dispatch({
      type: StoreActions.UPDATE_USER,
      data: null
    });
    localStorage.removeItem(USERID);
    navigate('/user-login');
  }

  return (
    <nav className='navbar'>
      <img src={logo} alt="" height={50} />
      {isMobileDevice() ?
        <div className='mobile-view-navbar'>
          <ShowHidePill />
          <button className="btn-link logout-btn" onClick={onLogoutClick}>
            <img src={LOGOUT_ICON} alt="Logout" color='red' width={20} />
          </button>
        </div> :
        <div className='navbar-right'>
          <div className='user-profile'>
            <h4 className='user-name'>{userName}</h4>
            <Avatar height={30} width={30} />
          </div>
          <ShowHidePill />
          <button className="btn-link logout-btn" onClick={onLogoutClick}>Logout</button>
        </div>
      }
    </nav>
  )
}

export default Navbar;