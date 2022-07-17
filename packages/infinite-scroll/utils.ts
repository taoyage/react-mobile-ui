export const isWindow = (element: HTMLElement | Window): element is Window => {
  return element === window;
};
