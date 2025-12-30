import Avatar from '../Avatar';
import './Navbar.css';
import logo from '../../public/assets/track-my-wallet-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { StoreActions, type InitialState } from '../../datatypes';
import { getFullName, isMobileDevice } from '../../utils';
import { USERID } from '../../constants';
import { useNavigate } from 'react-router-dom';

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
      {isMobileDevice() ? <button className="btn-link logout-btn" onClick={onLogoutClick}>Logout</button> :
        <div className='navbar-right'>
          <div className='user-profile'>
            <h4 className='user-name'>{userName}</h4>
            <Avatar height={30} width={30} />
          </div>
          <button className="btn-link logout-btn" onClick={onLogoutClick}>Logout</button>
        </div>
      }
    </nav>
  )
}

export default Navbar;