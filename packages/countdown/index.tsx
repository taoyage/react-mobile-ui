import React from 'react';

import './styles/index.scss';

export interface CountdownProps {
  /** 倒计时总时长，单位毫秒 */
  time: number;
  format: string;
}

const Countdown: React.FC = React.memo(() => {
  return <div>123</div>;
});
