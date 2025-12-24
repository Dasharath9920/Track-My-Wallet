import type React from 'react';
import './AmountCard.css';

const AmountCard: React.FC<CardProps> = (props) => {
  const { title, heading, subTitle, backgroundColor } = props;
  return (
    <div className='amount-card' style={{ backgroundColor: backgroundColor }}>
      <p>{heading}</p>
      <h2 style={{ margin: '0' }}>{title}</h2>
      <p>{subTitle}</p>
    </div>
  )
}

type CardProps = {
  title: string,
  heading: string,
  subTitle: string,
  backgroundColor: string,
}

export default AmountCard;