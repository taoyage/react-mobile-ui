import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

const useScrollLock = (visible: boolean) => {
  useIsomorphicLayoutEffect(() => {
    if (!visible) return;

    const el = document.getElementsByTagName('html')[0];
    el.style.overflow = 'hidden';

    return () => {
      el.style.overflow = '';
    };
  }, [visible]);
};

export default useScrollLock;
