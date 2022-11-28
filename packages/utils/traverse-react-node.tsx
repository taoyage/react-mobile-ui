import React from 'react';
import { isFragment } from 'react-is';

export const traverseReactNode = (children: React.ReactNode, fn: (child: React.ReactNode, index: number) => void) => {
  let i = 0;
  const handle = (target: React.ReactNode) => {
    React.Children.forEach(target, (child) => {
      if (!isFragment(child)) {
        fn(child, i);
        i++;
      } else {
        handle(child.props.children);
      }
    });
  };

  handle(children);
};
