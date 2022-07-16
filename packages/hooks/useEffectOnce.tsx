import React from 'react';

const useEffectOnce = (effect: React.EffectCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(effect, []);
};

export default useEffectOnce;
