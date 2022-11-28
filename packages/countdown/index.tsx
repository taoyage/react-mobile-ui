import React from 'react';
import cx from 'classnames';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { getTimeItems } from '@/countdown/utils';

import './styles/index.scss';

export interface CountdownProps {
  /** 倒计时总时长，单位毫秒 */
  time: number;
  /** 倒计时格式 */
  format?: string;
  /** 结束文案 */
  endText?: string;
  /** 数字样式 */
  numberClassName?: string;
  /** 符号样式 */
  symbolClassName?: string;
  /** 结束文案样式 */
  endTextClassName?: string;
}

type timeItemType = {
  num: string;
  symbol: string;
}[];

const Countdown: React.FC<CountdownProps> = React.memo((props) => {
  const [timeItems, setTimeItems] = React.useState<timeItemType>([]);
  const [timeEnd, setTimeEnd] = React.useState<boolean>(false);
  const computeTimeRef = React.useRef<number>(props.time);
  const timerRef = React.useRef<number>(0);
  const endTimeMs = React.useMemo(() => Date.now() + computeTimeRef.current, []);

  const setCountdownTimeItems = React.useCallback(() => {
    if (computeTimeRef.current <= 0) {
      setTimeEnd(true);
      clearTimeout(timerRef.current);
    }

    const timeItems = getTimeItems(props.format!, computeTimeRef.current);
    setTimeItems(timeItems);
  }, [props.format]);

  const initCountdown = React.useCallback(() => {
    clearTimeout(timerRef.current);
    // 当前时间
    const now = Date.now();
    // 获得剩余毫秒数
    computeTimeRef.current = endTimeMs - now;
    timerRef.current = window.setTimeout(() => {
      initCountdown();
    });
    setCountdownTimeItems();
  }, [endTimeMs, setCountdownTimeItems]);

  useIsomorphicLayoutEffect(() => {
    initCountdown();

    return () => clearTimeout(timerRef.current);
  }, [initCountdown]);

  return (
    <div className="ygm-countdown">
      {timeEnd && props.endText ? (
        <div className={props.endTextClassName}>{props.endText}</div>
      ) : (
        timeItems.map((item, index) => (
          <div className="ygm-countdown-item" key={index}>
            <div className={cx('ygm-countdown-item-num', props.numberClassName)}>{item.num}</div>
            <div className={cx('ygm-countdown-item-symbol', props.symbolClassName)}>{item.symbol}</div>
          </div>
        ))
      )}
    </div>
  );
});

Countdown.displayName = 'Countdown';

Countdown.defaultProps = {
  format: 'hh:mm:ss',
};

export default Countdown;
