import React from 'react';
import cx from 'classnames';

import './styles/swiper-page-indicator.scss';

export interface SwiperPageIndicatorProps {
  current: number;
  total: number;
  indicatorClassName?: string;
}

const classPrefix = 'ygm-swiper-page-indicator';

const SwiperPageIndicator: React.FC<SwiperPageIndicatorProps> = React.memo((props) => {
  const dots: React.ReactElement[] = React.useMemo(() => {
    return Array(props.total)
      .fill(0)
      .map((_, index) => (
        <div
          key={index}
          className={cx(`${classPrefix}-dot`, {
            [`${classPrefix}-dot-active`]: props.current === index,
          })}
        />
      ));
  }, [props]);

  return <div className={classPrefix}>{dots}</div>;
});

SwiperPageIndicator.displayName = 'SwiperPageIndicator';

export default SwiperPageIndicator;
