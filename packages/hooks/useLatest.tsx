import React from 'react';

const useLatest = <T,>(value: T) => {
  const ref = React.useRef(value);
  ref.current = value;

  return ref;
};

export default useLatest;
