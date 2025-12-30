import { useDispatch, useSelector } from 'react-redux';
import { StoreActions, type InitialState } from '../../datatypes';
import { useState } from 'react';
import './ShowHidePill.css';

const ShowHidePill = () => {

  const hideAmount = useSelector((state: InitialState) => state.hideAmount);
  const dispatch = useDispatch();
  const [hide, setHide] = useState(hideAmount);
  const handleToggle = () => {
    dispatch({
      type: StoreActions.UPDATE_HIDE_AMOUNT,
      data: !hide
    });
    setHide((hide) => !hide);
  }

  return (
    <div className='show-hide'>
      <p>hide</p>
      <div className='show-hide-container' onClick={handleToggle}>
        <div className={`show-hide-ball ${!hide ? 'show-amount' : ''}`}></div>
      </div>
      <p>show</p>
    </div>
  )
}

export default ShowHidePill;