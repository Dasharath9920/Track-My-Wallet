import React, { type ReactNode } from 'react'
import './Card.css';

const Card: React.FC<CardProps> = (props) => {
  const { loading } = props;
  return (
    <div className='card'>
      <h1 className='heading'>{props.heading}</h1>
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
}

export default Card;