import useEffectOnce from '@/hooks/useEffectOnce';

const useMount = (fn: () => void) => {
  useEffectOnce(() => {
    fn();
  });
};

export default useMount;
