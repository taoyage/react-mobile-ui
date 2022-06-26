import React from 'react';

import './styles/swiper-item.scss';

export interface SwiperItemProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children?: React.ReactNode;
}

const SwiperItem: React.FC<SwiperItemProps> = React.memo((props) => {
  return (
    <div className="ygm-swiper-item" onClick={props.onClick}>
      {props.children}
    </div>
  );
});

SwiperItem.displayName = 'SwiperItem';

export default SwiperItem;
