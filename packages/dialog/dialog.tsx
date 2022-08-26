import React from 'react';
import { useSpring, animated } from '@react-spring/web';

import Mask from '@/mask';
import type { MaskProps } from '@/mask';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import './styles/index.scss';

export interface DialogProps {
  header?: React.ReactNode;
  title?: React.ReactNode;
  content?: React.ReactNode;
  visible?: boolean;
  maskStyle?: MaskProps['style'];
  /** Dialog关闭时的回调 */
  onClose?: () => void;
}

const classPrefix = 'ygm-dialog';

const Dialog: React.FC<DialogProps> = (props) => {
  const [active, setActive] = React.useState<boolean>(props.visible!);

  const style = useSpring({
    scale: props.visible ? 1 : 0.8,
    opacity: props.visible ? 1 : 0,
    config: {
      mass: 1.2,
      tension: 200,
      friction: 25,
      clamp: true,
    },
    onReset: () => {
      setActive(props.visible!);
    },
  });

  useIsomorphicLayoutEffect(() => {
    if (props.visible) {
      setActive(true);
    }
  }, [props.visible]);

  const renderTitle = () => {
    if (props.title) {
      return <div className={`${classPrefix}-header`}>{props.title}</div>;
    }
    return null;
  };

  const renderContent = () => {
    if (props.content) {
      return <div className={`${classPrefix}-content`}>{props.content}</div>;
    }
    return null;
  };

  const renderFooter = () => {
    return <div className={`${classPrefix}-footer`}>footer</div>;
  };

  return (
    <div className={classPrefix} style={{ display: active ? undefined : 'none' }}>
      <Mask visible={props.visible!} style={props.maskStyle} onMaskClick={props.onClose} />
      <div className={`${classPrefix}-wrap`}>
        <animated.div style={style}>
          <div className={`${classPrefix}-body`}>
            {renderTitle()}
            {renderContent()}
            {renderFooter()}
          </div>
        </animated.div>
      </div>
    </div>
  );
};

Dialog.defaultProps = {
  visible: false,
};

Dialog.displayName = 'Dialog';

export default Dialog;
