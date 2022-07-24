import React from 'react';

export const getTouchEventData = (
  e: TouchEvent | MouseEvent | React.TouchEvent<HTMLElement> | React.MouseEvent<HTMLElement>
) => {
  return 'changedTouches' in e ? e.changedTouches[0] : e;
};
