import React, { type ReactNode } from 'react'
import './Card.css';

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className='card'>
      <h1 className='heading'>{props.heading}</h1>
      <div className='children-container'>
        {props.children}
      </div>
    </div>
  )
}

type CardProps = {
  heading: string,
  children: ReactNode
}

export default Card;