import React from 'react'

const TWButton: React.FC<TWButtonProps> = (props: TWButtonProps) => {
  const { text, padding = '8px 12px', loading = false, onClick, fontSize = '1rem', classes = '', type = 'button' } = props;

  return (
    <button
      type={type}
      className={`btn ${classes}`}
      style={{
        padding,
        fontSize,
        display: "flex",
        alignItems: "center",
      }}
      onClick={onClick}
      disabled={loading}
    >
      <span>{text}</span>
      {loading && <span className="btn-loader" />}
    </button>

  )
}

type TWButtonProps = {
  text: string;
  onClick?: () => void;
  padding?: string;
  loading?: boolean;
  fontSize?: string;
  classes?: string;
  type?: 'button' | 'submit' | 'reset';
}
export default TWButton;