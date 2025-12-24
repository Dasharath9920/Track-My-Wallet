import Avatar from '../Avatar';
import './Navbar.css';
import logo from '../../public/assets/track-my-wallet-logo.png';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <img src={logo} alt="" height={60} />
      <Avatar height={40} width={40} />
    </nav>
  )
}

export default Navbar;