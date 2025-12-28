import React from 'react';

type AvatarProps = {
  height?: number,
  width?: number,
  imgUrl?: string,
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const { height = 30, width = 30, imgUrl = "https://img.icons8.com/ios-filled/100/user-male-circle.png" } = props;
  return (
    <>
      <div style={{ height, width, borderRadius: '50%', overflow: 'hidden', alignItems: 'center', justifyContent: 'center', background: '#ffffffff' }}>
        <img src={imgUrl} alt="name" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
      </div>
    </>
  )
}

export default Avatar;