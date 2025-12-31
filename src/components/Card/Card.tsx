import React, { type ReactNode } from 'react'
import './Card.css';
import FilterComponent from '../TimeFilter/FilterComponent';

const Card: React.FC<CardProps> = (props) => {
  const { loading, onFilterChange } = props;
  return (
    <div className='card'>
      <div className={`card-header`}>
        <h1 className='heading'>{props.heading}</h1>
        {onFilterChange && <FilterComponent onChange={(value) => onFilterChange(value)} />}
      </div>
      <div className={`content-container ${loading ? 'loading' : ''}`}>
        {loading ? <p>Loading...</p> : props.children}
      </div>
    </div>
  )
}

type CardProps = {
  heading: string,
  children: ReactNode,
  loading: boolean,
  onFilterChange?: (value: number) => void;
}

export default Card;