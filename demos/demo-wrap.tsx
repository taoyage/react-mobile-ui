import React from 'react';

import './index.css';

interface DemoWrapProps {
  children?: React.ReactNode;
}

const DemoWrap: React.FC<DemoWrapProps> = (props) => {
  return <div className="demo-wrap">{props.children}</div>;
};

export default DemoWrap;
