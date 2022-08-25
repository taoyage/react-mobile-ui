import React from 'react';
import { useSpring, animated } from '@react-spring/web';

import Mask from '@/mask';

import type { MaskProps } from '@/mask';

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

    onStart: () => {
      setActive(true);
    },
    onReset: () => {
      setActive(props.visible!);
    },
  });

  const renderTitle = () => {};

  const renderContent = () => {};

  const renderBody = () => {};

  return (
    <div className={classPrefix} style={{ display: active ? undefined : 'none' }}>
      <Mask visible={props.visible!} style={props.maskStyle} />

      <animated.div style={style}>
        <>
          {renderTitle()}
          {renderContent()}
          {renderBody()}
        </>
      </animated.div>
    </div>
  );
};

Dialog.defaultProps = {
  visible: false,
};

Dialog.displayName = 'Dialog';

export default Dialog;
