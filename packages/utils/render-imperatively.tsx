import React from 'react';
import { renderToBody } from '@/utils/render';

export interface ElementProps {
  visible?: boolean;
  onClose?: () => void;
  afterClose?: () => void;
}

const renderImperatively = (element: React.ReactElement<ElementProps>) => {
  const Wraper = () => {
    const [visible, setVisible] = React.useState(false);

    const onClose = () => {
      element.props?.onClose?.();
      setVisible(false);
    };

    const afterClose = () => {
      unmount();
    };

    React.useEffect(() => {
      setVisible(true);
    }, []);

    return React.cloneElement(element, { ...element.props, visible, onClose, afterClose });
  };

  const unmount = renderToBody(<Wraper />);
};

export default renderImperatively;
