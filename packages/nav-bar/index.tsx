import React from 'react';

import { LeftOutline } from 'antd-mobile-icons';

import './styles/index.scss';

export interface NavBarProps {
  onBack?: () => void;
  right?: React.ReactNode;
  children?: React.ReactNode;
  leftArrow?: boolean;
  leftText?: string;
  border?: boolean;
  style?: React.CSSProperties & Partial<Record<'--nav-bar-height' | '--border-bottom', string>>;
}

const NavBar: React.FC<NavBarProps> = React.memo((props) => {
  return (
    <div className="ygm-nav-bar" style={props.style}>
      <div className="ygm-nav-bar-left" onClick={props.onBack}>
        {props.leftArrow && (
          <div className="ygm-nav-bar-left-icon">
            <LeftOutline />
          </div>
        )}
        <div className="ygm-nav-bar-left-text">{props.leftText}</div>
      </div>
      <div className="ygm-nav-bar-title">{props.children}</div>
      <div className="ygm-nav-bar-right">{props.right}</div>
    </div>
  );
});

NavBar.defaultProps = {
  leftText: '',
  leftArrow: true,
  border: false,
};

NavBar.displayName = 'NavBar';

export default NavBar;
